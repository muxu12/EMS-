import {Router} from 'express'
import { createLeave, getLeave, updateLeaveStatus } from '../Controllers/leaveController.js';
import { protect, protectAdmin } from '../Middleware/authMiddleware.js';

const leaveRoutes = Router()

leaveRoutes.post('/', protect ,createLeave )
leaveRoutes.get('/', protect ,getLeave)
leaveRoutes.patch('/:id', protect, protectAdmin, updateLeaveStatus )
export default leaveRoutes;