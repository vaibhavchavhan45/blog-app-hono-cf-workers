import { Context } from "hono";
import { getPrisma } from "../../lib/accelerateClient";
import { Env } from "../../types/variable";
import { signUpSchema } from "../../validations/user/signUp";
import bcrypt from "bcryptjs";
import { sign } from "hono/jwt";

export const userSignin = async (c: Context<Env>) => {
    const prisma = getPrisma(c.env.DATABASE_URL)

    const JWT_SECRET = c.env.JWT_SECRET

    const userBody = await c.req.json()

    const {success} = signUpSchema.safeParse(userBody)

    if(!success){
        c.status(400)
        return c.json({
            message: "Invalid inputs"
        })
    }

    try{
        const user = await prisma.user.findUnique({
            where: {
                email: userBody.email
            }
        })

        if(!user){
            c.status(401)
            return c.json({
                message: "Invalid credentials"
            })
        }

        const hashedPassword = await bcrypt.compare(userBody.password, user.password)

        if(!hashedPassword){
            c.status(401)
            return c.json({
                message: "Invalid credentials"
            })
        }

        const jwt = await sign({id: user.id}, JWT_SECRET)
 
        c.status(200)
        return c.json({
            message: "Login successful",
            jwt
        })
    }

    catch(err){
        c.status(500)
        return c.json({
            message: "Login Failed"
        })
    }
}