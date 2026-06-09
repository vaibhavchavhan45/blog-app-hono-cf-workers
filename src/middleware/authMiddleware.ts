import { verify } from "hono/jwt"
import { Context, Next } from "hono"


type Env = {
    Bindings: {
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}

export const authMiddleware = async (c: Context<Env>, next: Next) => {
    const JWT_SECRET = c.env.JWT_SECRET
    const authHeader = c.req.header('Authorization')

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        c.status(403)
        return c.json({
            message: "Unauthorized"
        })
    }

    const token = authHeader.split(" ")[1]

    const payload = await verify(token, JWT_SECRET, "HS256") as {id: string}

    if(!payload){
        c.status(403)
        return c.json({
            message: "Unauthorized"
        })
    }

    c.set('userId', payload.id)
    await next()
}