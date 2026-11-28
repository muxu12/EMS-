import {Router} from 'express'
import { protect, protectAdmin } from '../Middleware/authMiddleware.js';
import { createPayslip, getPayslip, getPayslipById } from '../Controllers/payslipControllers.js';

const payslipRoute = Router()

payslipRoute.post('/', protect, protectAdmin, createPayslip )
payslipRoute.get('/', protect, getPayslip )
payslipRoute.get('/:id', protect, getPayslipById )

export default payslipRoute;

