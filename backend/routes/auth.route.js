import express from 'express';
import { logout, userLogin, userSignup } from '../controllers/userController.js';

const authRouter = express.Router();

authRouter.post('/signup', userSignup);
authRouter.post('/login', userLogin);
authRouter.delete('/logout', logout)

export default authRouter;