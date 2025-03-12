import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config({
    path: "./.env"
});
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN as string,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true }))
app.get("/", (req: Request, res: Response): void => {
    res.send("my smart app is running properly")
});

import TodoRoute from './routes/Todo.routes';
app.use("/api", TodoRoute);

import UserRoute from "./routes/User.routes";
app.use("/api", UserRoute);

import UrlRoute from "./routes/Url.routes";
app.use("/api", UrlRoute);

import UrlRoute2 from "./routes/Url.routes";
app.use("/",UrlRoute2)

export { app }