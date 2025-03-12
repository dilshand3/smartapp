import mongoose, { Schema } from "mongoose";

interface url {
    originalUrl: string,
    shortUrl: string,
    active: boolean
}

const urlSchema = new Schema<url>({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });

export const URL = mongoose.model("URL", urlSchema);