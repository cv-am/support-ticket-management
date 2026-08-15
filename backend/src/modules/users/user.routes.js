import { Router } from "express"
import { protect } from "../../middleware/auth.middleware.js"
import { allowRoles } from "../../middleware/role.middleware.js"
import {validate} from "../../middleware/validate.middleware.js"
import { updatePasswordRules, updateUserRules, listUsersRules } from "../../validators/user.validator.js"
import * as userController from "./user.controller.js"

const router = Router()

router.use(protect)

router.get("/", allowRoles("Admin"),listUsersRules,validate, userController.getAll)
router.get("/me", userController.getOne)
router.patch("/update", updateUserRules, validate, userController.update)
router.delete("/delete", allowRoles("Admin"), userController.remove)
router.patch("/update/password", updatePasswordRules, validate, userController.updatePassword)

export default router