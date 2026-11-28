import {Router} from 'express'
import { protect } from '../Middleware/authMiddleware.js';
import { getDashboard } from '../Controllers/DashboardController.js';

const dashboardRouter = Router()

dashboardRouter.get('/', protect, getDashboard)

export default dashboardRouter