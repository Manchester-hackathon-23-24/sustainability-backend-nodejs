import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req?.cookies) {
        return res.status(401).json({ message: "Authorization token is required." });
    }
    
    const token = req.cookies?.jwt;
    if (!token) {
        return res.status(401).json({ message: "Authorization token is required." });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET || "");
        const user = await User.findById((decoded as JwtPayload)._id);
        req.user = user as IUser;
        next();
    } catch (error) {
        next(error);
    }    
};