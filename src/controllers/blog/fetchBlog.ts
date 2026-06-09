import { Context } from "hono";
import { Env } from "../../types/variable";
import { getPrisma } from "../../lib/accelerateClient";


export const fetchBlog = async (c: Context<Env>) => {
    const prisma = getPrisma(c.env.DATABASE_URL)

    const id = c.req.param("id")

    try {
       const blog = await prisma.post.findUnique({
            where: {
                id: id
            }
       })

       c.status(200)
       return c.json({
        message: "Successfully fetch the blog",
        blog
       })
    } 
    
    catch (error) {
        c.status(500)
        return c.json({
            message: "Failed to fetch the blog"
        })
    }
}

