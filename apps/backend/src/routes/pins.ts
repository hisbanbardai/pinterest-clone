import express, { Request, Response } from "express";
import prisma from "../lib/prisma.ts";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const result = await prisma.pins.findMany();
  res.status(200).json({ pins: result });
  return;
});

export default router;
