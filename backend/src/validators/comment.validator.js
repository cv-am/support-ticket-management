import { body, param } from "express-validator";

export const ticketIdParam = [
    param("ticketId").isInt({ min: 1 }).withMessage("ticketId must be a positive integer"),
];

export const commentIdParam = [
    param("commentId").isInt({ min: 1 }).withMessage("commentId must be a positive integer"),
];

export const createCommentRules = [
    ...ticketIdParam,
    body("content").trim().isLength({ min: 1, max: 5000 }).withMessage("content is required (max 5000 chars)"),
];

export const updateCommentRules = [
    ...commentIdParam,
    body("content").trim().isLength({ min: 1, max: 5000 }).withMessage("content is required (max 5000 chars)"),
];
