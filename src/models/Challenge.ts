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
    authorId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    accepted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
export default model("Challenge", challengeSchema);