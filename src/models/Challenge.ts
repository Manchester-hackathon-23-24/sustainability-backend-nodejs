import { Schema, model } from "mongoose";

const challengeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },    
    image: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    accepted: {
        type: Boolean,
        default: false,
    },
    xp: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
export default model("Challenge", challengeSchema);
