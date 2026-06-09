import { Context } from "hono";
import { Env } from "../../types/variable";
import { getPrisma } from "../../lib/accelerateClient";


export const fetchAllBlogs = async (c: Context<Env>) => {
    const prisma = getPrisma(c.env.DATABASE_URL)

    const page = Number(c.req.query("page") || 1 )
    const limit = Number(c.req.query("limit") || 10 )
    const skip = (page - 1) * 10

    try{
        const blogs = await prisma.post.findMany({
            skip,
            take: limit
        })

        c.status(200)
        return c.json({
            message: "Fetched Blogs successfully",
            blogs,
            page,
            limit
        })
    }

    catch(err){
        c.status(500)
        return c.json({
            message: "Failed to fetch the blogs"
        })
    }
}