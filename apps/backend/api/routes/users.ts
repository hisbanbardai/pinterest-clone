import express, { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { signinSchema, signupSchema } from "@repo/zod/types";
import { hashPassword, verifyPassword } from "../lib/passwordHashing.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const secret = process.env.JWT_SECRET_KEY as string;

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

    //hash password
    const password = result.data.password;
    const hashedPassword = await hashPassword(password);

    //create user in the db
    const newUser = await prisma.users.create({
      data: {
        ...result.data,
        password: hashedPassword,
      },
    });

    //generate jwt token

    const token = jwt.sign(
      {
        userId: newUser.id,
      },
      secret
    );

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });

    //delete password property before returning the user data
    if (newUser) {
      const { password, ...user } = newUser;
      res.status(201).json({ message: "User created successfully", user });
      return;
    }

    return;
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  const payload = req.body;

  try {
    const result = signinSchema.safeParse(payload);

    if (!result.success) {
      res.status(400).json({ error: result.error.errors });
      return;
    }

    const existingUser = await prisma.users.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!existingUser) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    if (existingUser?.password) {
      const passwordMatched = await verifyPassword(
        payload.password,
        existingUser?.password
      );

      if (!passwordMatched) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
    }

    //generate jwt token
    const token = jwt.sign(
      {
        userId: existingUser?.id,
      },
      secret
    );

    //add cookie
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });

    //delete password property before returning the user data
    if (existingUser) {
      const { password, ...user } = existingUser;
      res.status(200).json({ message: "User logged in successfully", user });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
});

router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Logged out",
  });
  return;
});

router.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const existingUser = await prisma.users.findFirst({
      where: {
        username,
      },
      include: {
        followers: true,
        following: true,
      },
      omit: {
        password: true,
      },
    });

    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user: existingUser });
    return;
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

export default router;
