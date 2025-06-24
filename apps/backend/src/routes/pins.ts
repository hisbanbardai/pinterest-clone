import express, { Request, Response } from "express";
import prisma from "../lib/prisma.ts";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;

  const result = await prisma.pins.findMany({
    skip: offset,
    take: limit,
  });
  res.status(200).json({ pins: result, nextOffset: limit + offset });
  return;
});

export default router;
