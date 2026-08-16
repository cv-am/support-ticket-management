import express from "express";
import cookieParser from "cookie-parser";
import { globalLimiter } from "./middleware/rateLimiter.js";
import authRoutes from "./modules/auth/auth.routes.js"
import userRoutes from "./modules/users/user.routes.js"
import ticketRoutes from "./modules/tickets/tickets.routes.js"
import commentRoutes from "./modules/comments/comment.routes.js"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(globalLimiter);

app.get("/", (req,res) => {
    res.json({ success: true, message: "Support Ticket Management API" })
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/tickets", ticketRoutes)
app.use("/api/comments", commentRoutes)

export default app;