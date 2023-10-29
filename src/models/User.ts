import { InferSchemaType, Schema, model } from "mongoose";
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },    
    role: {
        type: String,
        default: "user",
    }
}, { timestamps: true });

export default model("User", userSchema);
export type IUser = InferSchemaType<typeof userSchema>;