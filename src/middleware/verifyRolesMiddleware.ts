import { Request, Response, NextFunction } from "express";

export const verifyRolesMiddleware = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if (req.user && roles.includes(req.user.role)) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};