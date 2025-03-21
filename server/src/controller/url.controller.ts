import { Request, Response } from "express";
import { URL } from "../model/Url.model";
import { AuthenticatedRequest } from "../middlewares/verifyToken.middleware";
import { User } from "../model/User.model";

interface Res {
    success: boolean,
    message: string,
    data?: object
}

const createUrl = async (req: AuthenticatedRequest, res: Response<Res>): Promise<void> => {
    try {
        const { originalUrl } = req.body;
        const userId = req.userId;

        const username = await User.findById(userId);
        if (!username) {
            res.status(401).json({ success: false, message: "User not found" });
            return;
        }

        if (!originalUrl) {
            res.status(400).json({ success: false, message: "Original URL is required" });
            return;
        }
        const shortUrl = Date.now().toString().slice(-6);

        const createdUrl = `${req.protocol}://${req.get("host")}/${username.username}/${shortUrl}`;

        if (!createdUrl) {
            res.status(400).json({ success: false, message: "Url not shorted" })
        }

        const newUrl = new URL({
            originalUrl,
            shortUrl: createdUrl,
        });

        await newUrl.save();
        await User.findByIdAndUpdate(userId, { $push: { urls: newUrl._id } });

        res.status(201).json({
            success: true,
            message: "Short URL created successfully",
            data: newUrl
        });
    } catch (error) {
        console.error("Error creating URL", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const redirectURL = async (req: Request, res: Response): Promise<void> => {
    const { username, shortUrl } = req.params;

    const fullShortUrl = `${req.protocol}://${req.get("host")}/${username}/${shortUrl}`;

    const existingUrl = await URL.findOne({ shortUrl: fullShortUrl });

    if (!existingUrl || !existingUrl.active) {
        res.status(404).json({ success: false, message: "URL not found or inactive" });
        return;
    }

    res.redirect(existingUrl.originalUrl)
};

const toggleUrl = async (req: AuthenticatedRequest, res: Response<Res>): Promise<void> => {
    const { Id } = req.params;
    const existingUrl = await URL.findById(Id);

    if (!existingUrl) {
        res.status(404).json({ success: false, message: "URL not found" });
        return;
    }

    existingUrl.active = !existingUrl.active;
    await existingUrl.save();

    res.status(200).json({
        success: true,
        message: "URL status updated successfully",
        data: { active: existingUrl.active }
    });
}

const deleteUrl = async (req: AuthenticatedRequest, res: Response<Res>): Promise<void> => {
    const userId = req.userId;
    const { urlId } = req.body;

    if (!urlId) {
        res.status(400).json({ success: false, message: "URL ID is required" });
        return;
    }
    const existingUrl = await URL.findById(urlId);
    if (!existingUrl) {
        res.status(404).json({ success: false, message: "URL not found" });
        return;
    }

    const user = await User.findById(userId);
    if (!user || !user.urls.includes(urlId)) {
        res.status(403).json({ success: false, message: "Unauthorized to delete this URL" });
        return;
    }

    await URL.findByIdAndDelete(urlId);

    await User.findByIdAndUpdate(userId, { $pull: { urls: urlId } });
    res.status(200).json({ success: true, message: "URL deleted successfully" });
}

export { createUrl, redirectURL, toggleUrl, deleteUrl };