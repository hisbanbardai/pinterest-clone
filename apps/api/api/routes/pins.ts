import express, { Request, Response } from "express";
import prisma from "../lib/prisma.ts";
import { createPinSchema } from "@repo/zod/types";
import { authMiddleware } from "../middleware/auth.ts";
import { Prisma } from "@prisma/client";

const router = express.Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 10;
  const cursor =
    req.query.cursor !== "null" ? req.query.cursor?.toString() : "";
  const search = req.query.search;
  const userId = req.query.userId;
  const loggedInUserId = req.userId;
  const galleryType = req.query.galleryType;

  let whereClause;

  if (galleryType === "saved") {
    whereClause = {
      savedPins: {
        some: {
          userId: loggedInUserId,
        },
      },
    };
  } else if (galleryType === "created") {
    whereClause = {
      userId,
    };
  } else {
    whereClause = {
      title: {
        contains: search?.toString() || "",
        mode: "insensitive",
      },
    };
  }
  const queryConfig: Prisma.PinsFindManyArgs = {
    take: limit,
    where: whereClause as Prisma.PinsWhereInput,
    include: {
      savedPins: {
        where: {
          userId: loggedInUserId,
        },
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

router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  const pinId = req.params.id;
  const userId = req.userId;

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
        savedPins: true,
      },
    });

    if (!existingPin) {
      res.status(404).json({ message: "No pin found against that id" });
      return;
    }

    const savedPinCount = existingPin.savedPins.length;

    const savedPinsByUser = existingPin.savedPins.filter(
      (pin: { pinId: string; userId: string }) => pin.userId === userId
    );

    const pin = {
      ...existingPin,
      savedPins: savedPinsByUser,
    };

    res
      .status(200)
      .json({ pin: pin, user: existingPin.user, savedPinCount: savedPinCount });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const payload = req.body;
  const userId = req.userId;

  const result = createPinSchema.safeParse(payload);

  if (!result.success) {
    res.status(400).json({ error: result.error.errors });
    return;
  }

  try {
    const pin = await prisma.pins.create({
      data: {
        title: result.data.title,
        description: result.data.description,
        imageUrl: result.data.imageURL,
        userId,
      },
    });

    res.status(201).json({ message: "Pin created successfully", id: pin.id });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

export default router;
