import express, { Request, Response } from "express";
import { authMiddleware } from "../middleware/auth.ts";
import prisma from "../lib/prisma.ts";

const router = express.Router();

router.post(
  "/:username",
  authMiddleware,
  async (req: Request, res: Response) => {
    const followerUserId = req.userId;
    const followingUsername = req.params.username;

    try {
      if (!followingUsername?.trim()) {
        res.status(400).json({ message: "Invalid username" });
        return;
      } else {
        const followingUser = await prisma.users.findFirst({
          where: {
            username: followingUsername,
          },
          include: {
            followers: true,
            following: true,
          },
          omit: {
            password: true,
          },
        });

        if (!followingUser) {
          res.status(404).json({ message: "User not found" });
          return;
        }

        const isFollowing = followingUser?.followers.some(
          (followRecord: { followerId: string; followingId: string }) => {
            return followRecord.followerId === followerUserId;
          }
        );

        if (isFollowing) {
          const deletedFollowRecord = await prisma.follower_Following.delete({
            where: {
              followerId_followingId: {
                followerId: followerUserId,
                followingId: followingUser.id,
              },
            },
          });
          res.status(200).json({ deletedFollowRecord });
          return;
        } else {
          const createdFollowRecord = await prisma.follower_Following.create({
            data: {
              followerId: followerUserId,
              followingId: followingUser.id,
            },
          });
          res.status(201).json({ createdFollowRecord });
          return;
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
);

export default router;
