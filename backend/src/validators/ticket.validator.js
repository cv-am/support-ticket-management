import { body, param, query } from "express-validator";

const PRIORITIES = ["low", "medium", "high", "urgent"];
const STATUSES = ["open", "in_progress", "resolved", "closed"];

export const ticketIdParam = [
    param("id").isInt({ min: 1 }).withMessage("id must be a positive integer"),
];

export const createTicketRules = [
    body("title").trim().isLength({ min: 3, max: 200 }).withMessage("title must be 3-200 characters"),
    body("description").trim().isLength({ min: 1 }).withMessage("description is required"),
    body("priority").optional().isIn(PRIORITIES).withMessage(`priority must be one of ${PRIORITIES.join(", ")}`),
    body("assigned_to").optional({ nullable: true }).isInt({ min: 1 }).withMessage("assigned_to must be a positive integer"),
];

export const updateTicketRules = [
    ...ticketIdParam,
    body("title").optional().trim().isLength({ min: 3, max: 200 }),
    body("description").optional().trim().isLength({ min: 1 }),
    body("priority").optional().isIn(PRIORITIES).withMessage(`priority must be one of ${PRIORITIES.join(", ")}`),
    body("status").optional().isIn(STATUSES).withMessage(`status must be one of ${STATUSES.join(", ")}`),
    body("assigned_to").optional({ nullable: true }).isInt({ min: 1 }).withMessage("assigned_to must be a positive integer"),
];

export const listTicketsRules = [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("status").optional().isIn(STATUSES),
    query("priority").optional().isIn(PRIORITIES),
    query("assigned_to").optional().isInt({ min: 1 }),
];
