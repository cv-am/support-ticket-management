import { Router } from "express"
import { protect } from "../../middleware/auth.middleware.js"
import * as ticketController from "./tickets.controller.js"
import commentRouter from "../comments/comment.routes.js"

const router = Router()

router.use(protect)

router.post("/", ticketController.create)
router.get("/", ticketController.getAll)
router.get("/:id", ticketController.getOne)
router.patch("/:id", ticketController.update)
router.delete("/:id", ticketController.remove)

// nested: /api/tickets/:ticketId/comments
router.use("/:ticketId/comments", commentRouter)

export default router
