import { Request, Response } from "express";
import Challenge from "../models/Challenge";

export const createChallenge = async (req: Request, res: Response) => {
    try {
        const { title, description, image } = req.body;
        const email = req.user?.email;
        const challenge = await Challenge.create({ title, description, email, image });
        return res.status(201).json(challenge);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getAllAcceptedChallenges = async (req: Request, res: Response) => {
    try {
        const challenges = (await Challenge.find()).filter((challenge) => challenge.accepted).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        return res.status(200).json(challenges);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getAllPendingChallenges = async (req: Request, res: Response) => {
    try {
        const challenges = (await Challenge.find()).filter((challenge) => !challenge.accepted);
        return res.status(200).json(challenges);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const acceptChallenge = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { xp } = req.body;
        const challenge = await Challenge.findByIdAndUpdate(id, { accepted: true, xp: xp }, { new: true });
        return res.status(200).json(challenge);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const denyChallenge = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const challenge = await Challenge.findByIdAndUpdate(id, { accepted: false }, { new: true });
        return res.status(200).json(challenge);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const getChallenges = async (req: Request, res: Response) => {
    try {
        const challenges = await Challenge.find({ email: req.user?.email });
        console.log(req.user?.email)
        console.log(challenges)

        return res.status(200).json(challenges);

    } catch (error) {
        return res.status(500).json(error)
    } 
}