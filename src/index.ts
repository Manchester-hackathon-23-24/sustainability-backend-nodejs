import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import challengeRoutes from "./routes/challenge";
import authRoutes from "./routes/auth";
import { authMiddleware } from "./middleware/authMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use(authMiddleware);
app.use("/api/challenge", challengeRoutes);


const MONGODB_URI = process.env.MONGODB
mongoose.connect(MONGODB_URI!).then(() => { 
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
