import { Request, Response } from "express";
import { User } from "../model/User.model";
import { generateTokenAndSetCookie } from "../utils/cookies";
import bcrypt from "bcryptjs";
import { AuthenticatedRequest } from "../middlewares/verifyToken.middleware";

interface ReqBody {
    username: string,
    email?: string,
    password: string
}

interface Res {
    success: boolean,
    message: string,
    data?: object
}

const signup = async (req: Request<{}, {}, ReqBody>, res: Response<Res>): Promise<void> => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ success: false, message: "All field required" });
        return;
    }

    const existedUsername = await User.findOne({ username });
    if (existedUsername) {
        res.status(400).json({ success: false, message: "username already exist" })
        return
    }

    const existedemail = await User.findOne({ email });
    if (existedemail) {
        res.status(400).json({ success: false, message: "email already exist" })
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if (!createUser) {
        res.status(401).json({ success: false, message: "User didn't created" })
    }

    await generateTokenAndSetCookie(res, createUser._id.toString())

    res.status(200).json({
        success: true,
        message: "User created succesfully",
        data: {
            ...createUser.toObject(),
            password: undefined
        }
    })
}

const login = async (req: Request<{}, {}, ReqBody>, res: Response<Res>): Promise<void> => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ success: false, message: "All field require" });
        return;
    }

    const existedUser = await User.findOne({ username });

    if (!existedUser) {
        res.status(400).json({ success: false, message: "User not found" });
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, existedUser.password);
    if (!isPasswordValid) {
        res.status(400).json({ success: false, message: "Invalid Password" });
        return;
    }

    await generateTokenAndSetCookie(res, existedUser._id.toString());

    res.status(200).json({
        success: true,
        message: "User logged in succesfully",
        data: {
            ...existedUser.toObject(),
            password: undefined
        }
    })
}

const shareUser = async (req: AuthenticatedRequest, res: Response<Res>): Promise<void> => {
    const userId = req.userId;
    const existedUser = await User.findById(userId).select("-password").populate("urls todos");
    if (!existedUser) {
        res.status(404).json({ success: false, message: "User not found" })
        return;
    }

    res.status(200).json({
        success: true,
        message: "User share succesfully",
        data: existedUser
    })
}

const logout = async (req: Request, res: Response<Res>): Promise<void> => {
    res.clearCookie("Smart_TOKEN");
    res.status(200).json({ success: true, message: "Logged out successfully" });
}

export { signup, login, logout, shareUser }