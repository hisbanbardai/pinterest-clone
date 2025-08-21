import express, { Request, Response } from "express";
import userRouter from "./routes/users.js";
import pinsRouter from "./routes/pins.js";
import commentsRouter from "./routes/comments.js";
import followsRouter from "./routes/follows.js";
import savedPinsRouter from "./routes/savedPins.js";
import ImageKit from "imagekit";
import cors from "cors";
import cookieParser from "cookie-parser";
import prisma from "./lib/prisma.js";
import { authMiddleware } from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 3002;

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "", // https://ik.imagekit.io/your_imagekit_id
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
});

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/users", userRouter);
app.use("/pins", pinsRouter);
app.use("/comments", commentsRouter);
app.use("/follows", followsRouter);
app.use("/savedPins", savedPinsRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Hello world" });
  return;
});

app.get("/auth", authMiddleware, async function (req, res) {
  const userId = req.userId;

  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        id: userId,
      },
      include: {
        followers: true,
        following: true,
      },
      omit: {
        password: true,
      },
    });

    res.status(200).json({ valid: true, user: existingUser });
    return;
  } catch (error) {
    console.error(error);
    res.status(401).json({ valid: false });
    return;
  }

  // Your application logic to authenticate the user
  // For example, you can check if the user is logged in or has the necessary permissions
  // If the user is not authenticated, you can return an error response
  // const { token, expire, signature } = imagekit.getAuthenticationParameters();
  // res.send({
  //   token,
  //   expire,
  //   signature,
  //   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  // });
});

app.get("/imagekitauth", authMiddleware, async function (req, res) {
  const { token, expire, signature } = imagekit.getAuthenticationParameters();
  res.send({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
});

app.listen(PORT, () => console.log("Server running"));

export default app;
