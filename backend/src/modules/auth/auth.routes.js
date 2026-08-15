import { Router } from "express";
import {validate} from "../../middleware/validate.middleware.js"
import { registerRules, loginRules } from "../../validators/auth.validator.js"
import * as authController from "./auth.controller.js"

const router = Router()

router.post("/register", registerRules, validate, authController.register)
router.post("/login", loginRules, validate, authController.login)
router.post("/logout", authController.logout)

export default router