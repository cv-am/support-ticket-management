import { Router } from "express"
import { protect } from "../../middleware/auth.middleware.js"
import {validate} from "../../middleware/validate.middleware.js"
import { createCommentRules, updateCommentRules, commentIdParam } from "../../validators/comment.validator.js"
import * as commentController from "./comment.controller.js"

// mergeParams so :ticketId from the parent (tickets) router is visible here
const router = Router({ mergeParams: true })

router.use(protect)

router.post("/", createCommentRules, validate, commentController.create)
router.get("/", commentController.getAll)
router.patch("/:commentId", updateCommentRules, validate, commentController.update)
router.delete("/:commentId", commentIdParam, validate, commentController.remove)

export default router
