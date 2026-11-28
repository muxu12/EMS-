import mongoose from 'mongoose'
import { DEPARTMENTS } from '../data/department.js';

const employeeSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
            unique: true
        },

        firstName:{
            type: String,
            required: true,
        },

        lastName:{
            type: String,
            required: true,
        },

        email:{
            type: String, 
            required: true
        },

        phone:{
            type: String, 
            required: true
        },

        position:{
            type: String, 
            required: true
        },
        
        basicSalary:{
            type: Number, 
            default: 0
        },

        allowances:{
            type: Number, 
            default: 0
        },

        deductions:{
            type: Number, 
            default: 0
        },

        employmentStatus: {
           type: String, 
           enum:["Active", "InActive"],
           default: "Active"
        },

        joinDate: {
            type: Date,
            required: true
        },

        isDeleted: {
            type: Boolean,
            default: false
        },

        Bio: {
            type: String,
            default: ""
        },

        department: {
            type: String,
            enum: DEPARTMENTS
        },

        role:{
            type: String,
            enum:["ADMIN" , "EMPLOYEE"],
            default: "EMPLOYEE"
        },

    }, {timestamps:true}
) 

const EMPLOYEE = mongoose.models.EMPLOYEE || mongoose.model("EMPLOYEE", employeeSchema)
export default EMPLOYEE;