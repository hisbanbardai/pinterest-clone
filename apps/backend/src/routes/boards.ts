import express, { Request, Response } from "express";
import prisma from "../lib/prisma.ts";

const router = express.Router();

router.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const boardsByUserId = await prisma.boards.findMany({
      where: {
        userId,
      },
      include: {
        pins: true,
      },
    });

    res.status(200).json({ boards: boardsByUserId });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

export default router;
