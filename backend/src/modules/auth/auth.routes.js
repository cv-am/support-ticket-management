import { Router } from "express";
import {validate} from "../../middleware/validate.middleware.js"
import { registerRules, loginRules } from "../../validators/auth.validator.js"
import * as authController from "./auth.controller.js"
import { authLimiter } from "../../middleware/rateLimiter.js";

const router = Router()

router.post("/register", authLimiter, registerRules, validate, authController.register)
router.post("/login", authLimiter, loginRules, validate, authController.login)
router.post("/logout", authLimiter, authController.logout)

export default router