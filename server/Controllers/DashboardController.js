import { DEPARTMENTS } from "../data/department.js";
import Attendance from "../Models/AttendanceModel.js";
import EMPLOYEE from "../Models/EmployeeModel.js";
import LeaveApplication from "../Models/LeaveModel.js";
import PaySlip from "../Models/PaySlipModel.js";

// get dashboard for emp and admin 

export const getDashboard  = async (req, res) => {
    try {
        const session = req.session
        if(session.role === 'ADMIN') {
            const {totalEmployees, todayAttendance, pendingLeaves} = await Promise.all([
                EMPLOYEE.countDocuments({isDeleted: {$ne: true}}),
                Attendance.countDocuments({
                    date: {
                        $gte: new Date(new Date().setHours(0,0,0,0)),
                        $lt: new Date(new Date().setHours(24,0,0,0))
                    }
                }),
                LeaveApplication.countDocuments({status: 'PENDING'})
            ])

            return res.json({
                role: "ADMIN",
                totalEmployees,
                totalDepartment: DEPARTMENTS.length,
                todayAttendance,
                pendingLeaves
            })
        } else {
            // for employee
            const employee = await EMPLOYEE.findOne({
                userId: session.userId,

            }).lean()

            if(!employee) return res.status(404).json({error: 'Not found'})

            const today=  new Date()
            const [currentMonthAttendance, pendingLeaves , latestPayslip] = await Promise.all([
                Attendance.countDocuments({
                    employeeId: employee._id,
                    date: {
                        $gte: new Date(today.getFullYear(),today.getMonth(), 1),
                        $lt:  new Date(today.getFullYear(),today.getMonth() +1, 1),
                    }
                }),
                LeaveApplication.countDocuments({
                    employeeId: employee._id,
                    status: "PENDING"
                }),

                PaySlip.findOne({employeeId: employee._id}).sort({createdAt: -1}).lean()
            ])

            return res.json({
            role: "EMPLOYEE",
            employee: { ...employee, id: employee._id.toString() },
            currentMonthAttendance,
            pendingLeaves,
            latestPayslip: latestPayslip? { ...latestPayslip, id: latestPayslip._id.toString()}: null,
            });
        }
    } catch (error) {
        console.error('Dashboard error:' ,error)
        return res.status(500).json({error: 'Failed'})
    }   
}