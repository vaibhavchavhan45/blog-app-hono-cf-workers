import {z} from "zod"

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2).optional()
})

// Helpful in frontend for form validation
export type SignUpSchema = z.infer<typeof signUpSchema>
