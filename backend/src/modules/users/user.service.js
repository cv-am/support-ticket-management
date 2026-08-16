import { pool } from "../../db/db.js";
import ApiError from "../../utils/apiError.js";
import QUERIES from "./user.query.js";
import bcrypt from "bcrypt";


export const listUsers = async ({limit = 10, page = 1}) => {
    const [rows] = await pool.query(QUERIES.FIND_ALL,[Number(limit), Number((page - 1) * limit)]) //(page-1) * limit = skip records(offset)
    const [total] = await pool.query(QUERIES.COUNT_ALL)
    return { status: 200, message: "Users fetched", data: rows, total: total[0].total }
}

export const getUserById = async (id) => {
    const [rows] = await pool.query(QUERIES.FIND_BY_ID,[id])
    if (!rows.length) throw new ApiError(404, "User not found")
    return { status: 200, message: "User fetched", data: rows[0] }
}

export const updateUser = async (id, { name }) => {
    const [rows] = await pool.query(QUERIES.FIND_BY_ID, [id])
    if (!rows.length) throw new ApiError(404, "User not found")
    const updatedName = name ?? rows[0].name
    await pool.query(QUERIES.UPDATE, [updatedName, id])
    const [updated] = await pool.query(QUERIES.FIND_BY_ID, [id])
    return { status: 200, message: "User updated", data: updated[0] }
}

export const deleteUser = async (id,password) => {
    const [rows] = await pool.query(QUERIES.FIND_BY_ID, [id])
    if (!rows.length) throw new ApiError(404, "User not found")
    if ( rows[0].role == "Admin") throw new ApiError(400, "You cannot delete admin")
    const checkPassword = await bcrypt.compare(password, rows[0].password)
    if(!checkPassword) throw new ApiError(401, "Incorrect password")

    await pool.query(QUERIES.DELETE, [id])
    return { status: 200, message: "User deleted" }
}


export const updatePassword = async (id, password) => {
    const [rows] = await pool.query(QUERIES.FIND_BY_ID, [id])
    if (!rows.length) throw new ApiError(404, "User not found")
    
    const hashedPassword = await bcrypt.hash(password, 10)
    await pool.query(QUERIES.UPDATE_PASSWORD, [hashedPassword, id])
    return { status: 200, message: "Password updated" }
}
