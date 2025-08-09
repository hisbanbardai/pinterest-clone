import express, { Request, Response } from "express";
import prisma from "../lib/prisma.ts";

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

export default router;
