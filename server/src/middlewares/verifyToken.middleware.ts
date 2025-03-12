import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    userId?: string;
}

interface TokenPayload extends JwtPayload {
    userId: string;
}

export const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const Smart_TOKEN = req.cookies.Smart_TOKEN;

    if (!Smart_TOKEN) {
        res.status(401).json({ success: false, message: "UnAuthorized- no token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(Smart_TOKEN, process.env.JWT_SECRET as string) as TokenPayload;

        if (!decoded.userId) {
            res.status(401).json({ success: false, message: "Unauthorized- invalid token" });
            return;
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Error in verifyToken", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};