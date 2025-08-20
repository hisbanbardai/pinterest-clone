import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const secret = process.env.JWT_SECRET_KEY as string;

export const authMiddleware = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "You are not authenticated" });
    }

    //decode jwt token
    const decoded = jwt.verify(token, secret) as JwtPayload;

    //add user id in the request object
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
