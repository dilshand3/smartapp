import mongoose, { mongo, Schema } from "mongoose";

interface User {
    username: string,
    email: string,
    password: string,
    urls: mongoose.Types.ObjectId[],
    todos: mongoose.Types.ObjectId[]
}

const userSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    urls: [{
        type: Schema.Types.ObjectId,
        ref: "URL"
    }],
    todos: [{
        type: Schema.Types.ObjectId,
        ref: "Todo"
    }]
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);