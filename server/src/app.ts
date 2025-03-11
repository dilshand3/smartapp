import dotenv from "dotenv";
import express, { Request, Response } from "express";
dotenv.config({
    path: "./.env"
});
const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true }))
app.get("/", (req: Request, res: Response): void => {
    res.send("my smart app is running properly")
});

import TodoRoute from './routes/Todo.routes';
app.use("/api",TodoRoute);

export { app }