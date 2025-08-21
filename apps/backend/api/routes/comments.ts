import express, { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const router = express.Router();

router.get("/:pinId", async (req: Request, res: Response) => {
  const pinId = req.params.pinId;

  try {
    const commentsByPin = await prisma.comments.findMany({
      where: {
        pinId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          omit: {
            password: true,
          },
        },
      },
    });

    res.status(200).json({ comments: commentsByPin });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const pinId = req.body.pinId;
  const userId = req.userId;
  const text = req.body.text;

  if (!pinId || !text) {
    res.status(400).json({ message: "Invalid data" });
    return;
  }

  try {
    const comment = await prisma.comments.create({
      data: {
        pinId,
        userId,
        text,
      },
    });

    res.status(201).json({ message: "Comment added successfully" });
    return;
  } catch (error) {
    console.error(error);

    if (error instanceof PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === "P2003") {
        res.status(400).json({
          message: "Pin not found",
        });
        return;
      } else {
        res.status(500).json({ message: "Internal server error" });
        return;
      }
    } else {
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
});

export default router;
