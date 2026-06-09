import { Context } from "hono"
// import { PrismaClient } from "@prisma/client/edge"
// import { withAccelerate } from "@prisma/extension-accelerate"
import { getPrisma } from "../../lib/accelerateClient"
import { Env } from "../../types/variable"
import { signUpSchema } from "../../validations/user/signUp"
import bcrypt from "bcryptjs"
import { sign } from "hono/jwt"


export const userSignup = async (c: Context<Env>) => {
//     const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL
// }).$extends(withAccelerate())

    const prisma = getPrisma(c.env.DATABASE_URL)

    const JWT_SECRET = c.env.JWT_SECRET    
    
    const userBody = await c.req.json()

    const {success} = signUpSchema.safeParse(userBody)

    if(!success){
        c.status(400)
        return c.json({
            message: "Invalid input"
        })
    }

    try {
        const existingUser = await prisma.user.findUnique({
        where: {
            email: userBody.email
        }
        })

        if(existingUser){
            c.status(409)
            return c.json({
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(userBody.password, 10)

        const user = await prisma.user.create({
            data: {
                email: userBody.email,
                password: hashedPassword
            }
        })

        const jwt = await sign({id: user.id}, JWT_SECRET)
        
        c.status(200)
        return c.json({
            message: "token created successfully",
            jwt
        })
    } 
    
    catch (error) {
        console.log(error)
        c.status(500)
        return c.json({
            message: "Error while creating user"
        })
    }
}