import { Hono } from "hono";
import { Env } from "../types/variable";
import { userSignup } from "../controllers/user/userSignup";
import { userSignin } from "../controllers/user/userSignin";


const userRouter = new Hono<Env>()

userRouter.post('/signup', userSignup)
userRouter.post('/signin', userSignin)

export default userRouter