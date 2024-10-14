import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing Token" }); // Early return to avoid falling through
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next(); // Call next() to pass control to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" }); // Early return for invalid token
  }
};
