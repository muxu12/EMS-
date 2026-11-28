import {Router} from 'express'
import { changePassword, Login, session } from '../Controllers/authController.js';
import { protect } from '../Middleware/authMiddleware.js';

const authRouter = Router()

authRouter.post('/login', Login)
authRouter.get('/session', protect ,session)
authRouter.post('/change-password', protect ,changePassword)

export default authRouter;