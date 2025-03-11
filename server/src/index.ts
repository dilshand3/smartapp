import express from "express";
import { connectDB } from "./db/db";
import { app } from "./app";
const port = process.env.PORT || 2324

connectDB()
.then(() => {
    app.listen(port,() => {
        console.log(`Server is running on port ${port}`)
    })
})
.catch((error) => [
   console.log(`Something went wrong ${error}`)
])