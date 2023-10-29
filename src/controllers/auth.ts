import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/User";
import { generateJwtToken } from "../utils/generateJwtToken";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Missing email or password" });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, passwordHash });
        const token = generateJwtToken(user._id.toString(), process.env.TOKEN_SECRET!, "1d");
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Missing email or password" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = generateJwtToken(user._id.toString(), process.env.TOKEN_SECRET!, "1d");
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });
        const { passwordHash, ...userWithoutPassword } = user.toObject();
        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            return res.sendStatus(204);
        }

        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json(error);
    }
};