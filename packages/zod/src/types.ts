import z from "zod";

export const signupSchema = z.object({
  username: z.string().min(1, "Username is a required field"),
  name: z.string().min(1, "Name is a required field"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be 6 or more characters in length"),
});

export type signupSchemaType = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type signinSchemaType = z.infer<typeof signinSchema>;
