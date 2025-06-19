import express, { Request, Response } from "express";
import userRouter from "./routes/users.ts";
import ImageKit from "imagekit";
import { a } from "@repo/zod/types";

const app = express();
const PORT = process.env.PORT || 3002;

const imagekit = new ImageKit({
  urlEndpoint: "<YOUR_IMAGEKIT_URL_ENDPOINT>", // https://ik.imagekit.io/your_imagekit_id
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
});

console.log(a);

// allow cross-origin requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Hello world" });
  return;
});

app.get("/auth", function (req, res) {
  // Your application logic to authenticate the user
  // For example, you can check if the user is logged in or has the necessary permissions
  // If the user is not authenticated, you can return an error response
  const { token, expire, signature } = imagekit.getAuthenticationParameters();
  res.send({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
});

app.listen(PORT, () => console.log("Server running"));
