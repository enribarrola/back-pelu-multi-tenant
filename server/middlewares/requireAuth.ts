import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) return res.status(401).json({ message: "Unauthorized" })

  const token = authHeader.split(" ")[1]

  if (!token) return res.status(401).json({ message: "Unauthorized" })

  jwt.verify(token, process.env.SECRET_KEY? process.env.SECRET_KEY : 'secret', (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" })


    next()
  }) 
};
