import express, { Request, Response } from "express";
import userRouter from "./routes/users.ts";

const app = express();
const PORT = process.env.PORT || 3002;

app.use("/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Hello world" });
  return;
});

app.listen(PORT, () => console.log("Server running"));
