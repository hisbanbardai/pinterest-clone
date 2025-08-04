import express, { Request, Response } from "express";
import prisma from "../lib/prisma.ts";
import { Prisma } from "@prisma/client";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 10;
  const cursor =
    req.query.cursor !== "null" ? req.query.cursor?.toString() : "";
  const search = req.query.search;

  const queryConfig: Prisma.PinsFindManyArgs = {
    take: limit,
    where: {
      title: {
        contains: search?.toString() || "",
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  };

  //only add cursor if there is a value i.e. id of the last pin
  if (cursor) {
    queryConfig.cursor = { id: cursor };
    queryConfig.skip = 1;
  }

  const result = await prisma.pins.findMany(queryConfig);

  const lastPinInResults = result[result.length - 1];
  const myCursor = lastPinInResults?.id;

  res.status(200).json({ pins: result, cursor: myCursor });
  return;
});

router.get("/:id", async (req: Request, res: Response) => {
  const pinId = req.params.id;

  if (!pinId?.trim()) {
    res.status(400).json({ message: "Invalid pin id" });
    return;
  }

  try {
    const existingPin = await prisma.pins.findUnique({
      where: {
        id: pinId,
      },
      include: {
        user: {
          omit: {
            password: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!existingPin) {
      res.status(404).json({ message: "No pin found against that id" });
      return;
    }

    res.status(200).json({ pin: existingPin, user: existingPin.user });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

export default router;
