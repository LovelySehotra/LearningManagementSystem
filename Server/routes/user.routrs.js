import { Router } from "express";
import { register,login,logout,getProfile,forgotPassword ,resetPassword, changePassword} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
const router = Router();

router.post('/register',upload.single("avatar"),register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isLoggedIn, getProfile);
router.post('/forget-password',forgotPassword);
router.post('/reset-password',resetPassword);
router.post('/change-password',isLoggedIn,changePassword);



export default router;