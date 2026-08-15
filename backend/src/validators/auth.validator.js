import { body } from "express-validator";

export const registerRules = [
    body("name").trim().isLength({ min: 2, max: 100 }).withMessage("name must be 2-100 characters"),
    body("email").trim().isEmail().withMessage("a valid email is required").normalizeEmail(),
    body("password").isLength({ min: 8 }).withMessage("password must be at least 8 characters"),
    body("role").optional().isIn(["Admin", "Agent", "Customer"]).withMessage("role must be Admin, Agent, or Customer"),
];

export const loginRules = [
    body("email").trim().isEmail().withMessage("a valid email is required").normalizeEmail(),
    body("password").notEmpty().withMessage("password is required"),
];
