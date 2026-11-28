import mongoose from 'mongoose'

const payslipSchema = new mongoose.Schema({
    employeeId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "EMPLOYEE"
        },

        month: {
           type: Number,
           required: true
        },

        year: {
           type: Number,
           required: true
        },

        basicSalary: {
           type: Number,
           required: true
        },

        allowances: {
            type:Number,
            default: 0
        },

        deduction: {
            type:Number,
            default: 0
        },
        
        netSalary: {
            type:Number,
            required: true
        },


}, {timestamps: true})


const PaySlip = mongoose.models.PaySlip || mongoose.model("PaySlip", payslipSchema)
export default PaySlip;