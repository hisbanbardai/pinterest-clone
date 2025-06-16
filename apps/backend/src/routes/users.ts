import express from "express";
import prisma from "../lib/prisma.ts";

const router = express.Router();

router.get("/test", async (req, res) => {
  await prisma.users.create({
    data: {
      name: "hisban",
    },
  });
  res.json("User route working");
  return;
});

export default router;
