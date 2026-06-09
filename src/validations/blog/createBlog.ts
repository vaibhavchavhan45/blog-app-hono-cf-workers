import {z} from "zod"

export const createBlogSchema = z.object({
    title: z.string(),
    content: z.string()
})

export type CreateBlogSchema = z.infer<typeof createBlogSchema>