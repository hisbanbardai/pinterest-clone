import z from "zod";

export const signupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, "Password must be 6 or more characters in length"),
});

export type signupSchemaType = z.infer<typeof signupSchema>;
