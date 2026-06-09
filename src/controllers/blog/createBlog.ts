import { Context } from "hono";
import { Env } from "../../types/variable";
import { getPrisma } from "../../lib/accelerateClient";
import { createBlogSchema } from "../../validations/blog/createBlog";

export const createBlog = async (c: Context<Env>) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
    
    const authorId = c.get('userId')
    
    const body = await c.req.json()

    const {success} = createBlogSchema.safeParse(body)
    if(!success){
        c.status(400)
        return c.json({
            message: "Invalid Inputs"
        })
    }

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId // defined in the schema that userId needs to be while creating the post/blog
            }

        })

        c.status(200)
        return c.json({
            message: "Blog created successfully",
            id: blog.id // Frontend will redirect using it to the /blog/blog.id
        })
    } 
    
    catch (error) {
        c.status(500)
        console.log(error);
        return c.json({
            message: "Failed to create blog"
        })
    }
}