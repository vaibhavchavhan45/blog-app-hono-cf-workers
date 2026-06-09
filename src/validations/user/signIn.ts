import {z} from "zod"

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

// Helpful in frontend for form validation
export type SignInSchema = z.infer<typeof signInSchema>