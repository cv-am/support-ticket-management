import { pool } from "../../db/db.js";
import ApiError from "../../utils/apiError.js";
import QUERIES from "./ticket.query.js";

export const createTicket = async ({ title, description, priority = "medium", assigned_to = null }, createdBy) => {
    const [result] = await pool.query(QUERIES.CREATE, [
        title, description, priority, "open", createdBy, assigned_to
    ])
    const [rows] = await pool.query(QUERIES.FIND_BY_ID, [result.insertId])

    return { status: 201, message: "Ticket created", data: rows[0] }
}

export const getTicketById = async (id) => {
    const [rows] = await pool.query(QUERIES.FIND_BY_ID, [id])
    if (!rows.length) {
        throw new ApiError(404, "Ticket not found")
    }
    return { status: 200, message: "Ticket fetched", data: rows[0] }
}

// Customers only ever see tickets they created; Agents/Admins can filter freely.
export const listTickets = async (requester, { page = 1, limit = 20, status, priority, assigned_to }) => {
    const offset = (page - 1) * limit
    const conditions = []
    const params = []

    if (requester.role === "Customer") {
        conditions.push("created_by = ?")
        params.push(requester.id)
    }
    if (status) { conditions.push("status = ?"); params.push(status) }
    if (priority) { conditions.push("priority = ?"); params.push(priority) }
    if (assigned_to) { conditions.push("assigned_to = ?"); params.push(assigned_to) }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""

    const [rows] = await pool.query(QUERIES.FIND_ALL(whereClause), [...params, Number(limit), Number(offset)])
    const [[{ total }]] = await pool.query(QUERIES.COUNT(whereClause), params)

    return { status: 200, message: "Tickets fetched", data: { rows, total, page: Number(page), limit: Number(limit) } }
}

export const updateTicket = async (id, requester, payload) => {
    const [existingRows] = await pool.query(QUERIES.FIND_BY_ID, [id])
    if (!existingRows.length) {
        throw new ApiError(404, "Ticket not found")
    }
    const ticket = existingRows[0]

    if (requester.role === "Customer" && ticket.created_by !== requester.id) {
        throw new ApiError(403, "You can only update tickets you created")
    }

    const title = payload.title ?? ticket.title
    const description = payload.description ?? ticket.description
    const priority = payload.priority ?? ticket.priority
    const status = payload.status ?? ticket.status
    const assigned_to = payload.assigned_to !== undefined ? payload.assigned_to : ticket.assigned_to

    await pool.query(QUERIES.UPDATE, [title, description, priority, status, assigned_to, id])
    const [rows] = await pool.query(QUERIES.FIND_BY_ID, [id])

    return { status: 200, message: "Ticket updated", data: rows[0] }
}

export const deleteTicket = async (id, requester) => {
    const [rows] = await pool.query(QUERIES.FIND_BY_ID, [id])
    if (!rows.length) {
        throw new ApiError(404, "Ticket not found")
    }
    if (requester.role === "Customer" && rows[0].created_by !== requester.id) {
        throw new ApiError(403, "You can only delete tickets you created")
    }

    await pool.query(QUERIES.DELETE, [id])
    return { status: 200, message: "Ticket deleted" }
}
