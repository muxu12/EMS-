import "dotenv/config"

import connectDb from './config/db.js'
import User from "./Models/User.js";
import bcrypt from 'bcrypt'

// temp password for admin 

const TemporaryPassword = "admin123";

async function registerAdmin() {
    try {
        const Admin_Email = process.env.Admin_Email
        if(!Admin_Email) {
            console.error('Missing Admin email')
            process.exit(1)
        }

        await connectDb()

        // if we find admin in DB

        const existingAdmin= await User.findOne({email:process.env.Admin_Email}) 

        if(existingAdmin) {
            console.log('User already exists as role', existingAdmin.role)
            process.exit(0)
        }

        // if existing admin not in the db

        const hashedPassword = await bcrypt.hash(TemporaryPassword, 10)
        const admin = await User.create({
            email: process.env.Admin_Email,
            password: hashedPassword,
            role: 'ADMIN' 
        })

        console.log('Admin user created')
        console.log("\nemail:",admin.email)
        console.log("password:", TemporaryPassword)
        console.log("Change the password after login")

        process.exit(0)

    } catch (error) {
        console.error('Seed failed: ', error)
    }
}

registerAdmin();