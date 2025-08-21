import express, { Request, Response } from "express";
import { authMiddleware } from "../middleware/auth.js";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const pinId = req.body.pinId;
  const userId = req.userId;

  try {
    //check if record already exist then delete
    const existingSavedPinRecord = await prisma.user_Saved_Pins.findUnique({
      where: {
        userId_pinId: {
          userId,
          pinId,
        },
      },
    });

    if (existingSavedPinRecord) {
      const deletedSavedPinRecord = await prisma.user_Saved_Pins.delete({
        where: {
          userId_pinId: {
            userId,
            pinId,
          },
        },
      });
      res.status(200).json({ deletedSavedPinRecord });
      return;
    }

    const savedPinRecord = await prisma.user_Saved_Pins.create({
      data: {
        pinId,
        userId,
      },
    });

    res.status(201).json({ savedPinRecord });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

export default router;
