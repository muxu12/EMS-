import {Router} from 'express'
import { protect } from '../Middleware/authMiddleware.js';
import { clockInOut, getAttendance } from '../Controllers/attendanceController.js';

const attendanceRouter = Router()

attendanceRouter.post('/', protect, clockInOut)
attendanceRouter.get('/', protect, getAttendance)

export default attendanceRouter;