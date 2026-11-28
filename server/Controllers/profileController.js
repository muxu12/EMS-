import EMPLOYEE from "../Models/EmployeeModel.js";

// Get profile


export const getProfile = async (req, res) => {
    try {
        const session = req.session
        const employee = await EMPLOYEE.findOne({userId: session.userId})

        if(!employee) {
            // authenticated user is not an employee return admin profile 
            return res.json({
                firstName: "Admin",
                lastName: "",
                email: session.email,
            })
 
        }

        return res.json(employee)

    } catch (error) {
        return res.status(500).json({error: 'Failed to fetch the profile'})
    }
}

// update profile

export const updateProfile = async (req, res) => {
    try {
        const session = req.session
        const employee = await EMPLOYEE.findOne({userId: session.userId})
        
        if(!employee) return res.status(404).json({error: 'Employee not found'})
        if(employee.isDeleted){
            return res.status(403).json(
            {error: 'Your account is deactivated. You cannot update your profile'})
        } 
        
        
        await EMPLOYEE.findByIdAndUpdate(employee._id, {
            Bio: req.body.Bio
        })

        return res.json({success: true})

    } catch (error) {
        return res.status(500).json({error: 'Failed to update the profile'})
    }
}