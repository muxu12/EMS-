import {Router} from 'express'
import { protect } from '../Middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../Controllers/profileController.js';

const profileRouter = Router()

profileRouter.get('/',protect, getProfile)
profileRouter.post('/',protect, updateProfile)

export default profileRouter;
