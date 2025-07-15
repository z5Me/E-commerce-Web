import express from 'express';
import { reSignIn, SignIn, SignUp } from '../controllers/User';
import { protect } from '../middlewares/protect';

const userRouter = express.Router();

userRouter.post('/signup', SignUp);
userRouter.post('/signin', SignIn);
userRouter.get('/reSignin', protect, reSignIn)

export default userRouter;