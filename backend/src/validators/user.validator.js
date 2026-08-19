import { body, param, query } from "express-validator";

export const userIdParam = [
    param("id").optional().isInt({ min: 1 }).withMessage("id must be a positive integer"),
];

export const updateUserRules = [
    ...userIdParam,
    body("name").optional().trim().isLength({ min: 2, max: 100 })
        .withMessage("name must be 2-100 characters"),
    body("role").optional().isIn(["Admin", "Agent", "Customer"])
        .withMessage("role must be Admin, Agent, or Customer"),
];

export const listUsersRules = [
    query("page").optional().isInt({ min: 1 }).withMessage("page must be >= 1"),
    query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("limit must be 1-100"),
];

export const updatePasswordRules = [
    body("current_password").notEmpty().withMessage("current_password is required"),
    body("new_password").isLength({ min: 8 }).withMessage("new_password must be at least 8 characters"),
]