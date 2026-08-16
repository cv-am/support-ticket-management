import { pool } from "../../db/db.js";
import ApiError from "../../utils/apiError.js";
import QUERIES from "./comment.query.js";

export const addComment = async (ticketId, userId, content) => {
    const [ticketRows] = await pool.query(QUERIES.FIND_TICKET, [ticketId])
    if (!ticketRows.length) {
        throw new ApiError(404, "Ticket not found")
    }
    const [result] = await pool.query(QUERIES.CREATE, [ticketId, userId, content])
    const [rows] = await pool.query(QUERIES.FIND_BY_ID, [result.insertId])
    return { status: 201, message: "Comment added", data: rows[0] }
}

export const listComments = async (ticketId, { page = 1, limit = 20 }) => {
    const [ticketRows] = await pool.query(QUERIES.FIND_TICKET, [ticketId])
    if (!ticketRows.length) {
        throw new ApiError(404, "Ticket not found")
    }
    const offset = (page - 1) * limit
    const [rows] = await pool.query(QUERIES.FIND_BY_TICKET, [ticketId, Number(limit), Number(offset)])
    const [[{ total }]] = await pool.query(QUERIES.COUNT_BY_TICKET, [ticketId])

    return { status: 200, message: "Comments fetched", data: { rows, total, page: Number(page), limit: Number(limit) } }
}

export const updateComment = async (commentId, requester, content) => {
    const [rows] = await pool.query(QUERIES.FIND_BY_ID, [commentId])
    if (!rows.length) {
        throw new ApiError(404, "Comment not found")
    }
    if (requester.role !== "Admin" && rows[0].user_id !== requester.id) {
        throw new ApiError(403, "You can only edit your own comments")
    }

    await pool.query(QUERIES.UPDATE, [content, commentId])
    const [updated] = await pool.query(QUERIES.FIND_BY_ID, [commentId])

    return { status: 200, message: "Comment updated", data: updated[0] }
}

export const deleteComment = async (commentId, requester) => {
    const [rows] = await pool.query(QUERIES.FIND_BY_ID, [commentId])
    if (!rows.length) {
        throw new ApiError(404, "Comment not found")
    }
    if (requester.role !== "Admin" && rows[0].user_id !== requester.id) {
        throw new ApiError(403, "You can only delete your own comments")
    }

    await pool.query(QUERIES.DELETE, [commentId])
    return { status: 200, message: "Comment deleted" }
}
