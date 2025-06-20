import express from "express";
import prisma from "../lib/prisma.ts";
import { signupSchema } from "@repo/zod/types";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const payload = req.body;

    const result = signupSchema.safeParse(payload);

    if (result.success) {
      await prisma.users.create({
        data: payload,
      });

      res.status(200).json({ message: "User created successfully" });
    }

    if (result.error) {
      throw new Error(result.error.toString());
    }
  } catch (error) {
    console.log(error);
  }

  // res.json("User route working");
  // return;
});

export default router;
