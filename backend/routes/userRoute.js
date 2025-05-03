import express from 'express';
import { adminLogin, sendotp, signup, login, check_auth, logout } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/sendotp',sendotp)
userRouter.post('/signup',signup)
userRouter.post('/login',login)
userRouter.post('/admin',adminLogin)
userRouter.get('/check_auth',check_auth)
userRouter.get('/logout',logout)


export default userRouter;