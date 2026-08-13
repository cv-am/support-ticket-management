import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes.js"

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req,res) => {
    res.json({ success: true, message: "Support Ticket Management API" })
})

app.use("/api/auth", authRoutes)

export default app;

