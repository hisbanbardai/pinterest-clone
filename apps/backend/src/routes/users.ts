import express, { Request, Response } from "express";
import prisma from "../lib/prisma.ts";
import { signupSchema } from "@repo/zod/types";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response): Promise<any> => {
  const payload = req.body;

  const result = signupSchema.safeParse(payload);

  if (!result.success) {
    res.status(400).json({ error: result.error.errors });
    return;
  }

  try {
    //check if user already exists
    const { email } = result.data;
    const existingUser = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      res
        .status(409)
        .json({ message: "User with that email address already exists" });
    }

    //create user in the db
    await prisma.users.create({
      data: result.data!,
    });

    res.status(201).json({ message: "User created successfully" });
    return;
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

export default router;
