import express, { Request, Response } from "express";
import userRouter from "./routes/users.ts";
import pinsRouter from "./routes/pins.ts";
import boardsRouter from "./routes/boards.ts";
import commentsRouter from "./routes/comments.ts";
import ImageKit from "imagekit";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt, { JwtPayload } from "jsonwebtoken";

const secret = process.env.JWT_SECRET_KEY as string;

const app = express();
const PORT = process.env.PORT || 3002;

const imagekit = new ImageKit({
  urlEndpoint: "<YOUR_IMAGEKIT_URL_ENDPOINT>", // https://ik.imagekit.io/your_imagekit_id
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
});

// allow cross-origin requests
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    //we need to add the above to allow requests from the set origin and also set cookie header
  })
);

app.use("/users", userRouter);
app.use("/pins", pinsRouter);
app.use("/boards", boardsRouter);
app.use("/comments", commentsRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Hello world" });
  return;
});

app.get("/auth", function (req, res) {
  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    res.status(200).json({ valid: true, userId: decoded.userId });
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

app.listen(PORT, () => console.log("Server running"));
