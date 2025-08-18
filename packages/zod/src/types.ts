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

export const createPinSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  imageURL: z
    .string()
    .url("Invalid URL format.")
    .refine(
      (url) => url.startsWith("http://") || url.startsWith("https://"),
      "Image URL must use HTTP or HTTPS protocol."
    )
    .refine(
      (url) => /\.(jpeg|jpg|png)$/i.test(url),
      "Image URL must have a valid image file extension."
    ),
});

export type createPinSchemaType = z.infer<typeof createPinSchema>;
