import {z} from "zod"

export const updateBlogSchema = z.object({
    title: z.string(),
    content: z.string(),
    blogId: z.string()
})

export type UpdateBlogSchema = z.infer <typeof updateBlogSchema>