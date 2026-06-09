import { Context } from "hono"
import { Env } from "../../types/variable"
import { getPrisma } from "../../lib/accelerateClient"
import { updateBlogSchema } from "../../validations/blog/updateBlog"

export const updateBlog = async (c: Context<Env>) => {
    const prisma = getPrisma(c.env.DATABASE_URL)

    const authorId = c.get('userId')

    const body = await c.req.json()

    const {success} = updateBlogSchema.safeParse(body)
    if(!success){
        c.status(400)
        return c.json({
            message: "Invalid inputs"
        })
    }

    try {
        const blog = await prisma.post.update({
            where: {
                id: body.blogId,
                authorId: authorId
            },
            data: {
                title: body.title,
                content: body.content
            }
        })

        c.status(200)
        return c.json({
            message: "Blog updated successfully",
            id: blog.id //For frontend to re-direct
        })
    } 
    
    catch (error) {
        c.status(500)
        return c.json({
            message: "Error while updating the blog"
        })
    }
}