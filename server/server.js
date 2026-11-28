import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import multer from 'multer'
import connectDb from './config/db.js';
import authRouter from './Routes/authRouter.js';
import employeeRouter from './Routes/employeeRoute.js';
import profileRouter from './Routes/profileRoutes.js';
import attendanceRouter from './Routes/attendanceRoutes.js';
import leaveRoutes from './Routes/leaveRoutes.js';
import payslipRoute from './Routes/paysliproute.js';
import dashboardRouter from './Routes/dashboardroutes.js';

const app = express()

const PORT = process.env.PORT || 4000 

// middleware

app.use(cors())
app.use(express.json())
app.use(multer().none())

// route

app.get('/', (req, res)=>{
    res.send('Server is running')
})

app.use('/api/auth', authRouter)
app.use('/api/employees', employeeRouter)
app.use('/api/profile', profileRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/api/leave', leaveRoutes)
app.use('/api/payslips', payslipRoute)
app.use('/api/dashboard', dashboardRouter)


await connectDb()
app.listen(PORT, ()=>console.log(`server is listening on port ${PORT}`)
)