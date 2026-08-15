import { pool } from "../../db/db.js";
import QUERIES from "./user.query.js";
import bcrypt from "bcrypt";


export const listUsers = async ({limit = 10, page = 1}) => {
    const [rows] = await pool.query(QUERIES.FIND_ALL,[limit, (page - 1) * limit])
    const [total] = await pool.query(QUERIES.COUNT_ALL)
    return { status: 200, message: "Users fetched", data: rows, total: total[0].total }
}

export const getUserById = async (id) => {
    const [rows] = await pool.query(QUERIES.FIND_BY_ID,[id])
    if (!rows.length) {
        return { status: 404, message: "User not found" }
    }
    return { status: 200, message: "User fetched", data: rows[0] }
}

export const updateUser = async (id, { name, role }) => {
    const [rows] = await pool.query(QUERIES.FIND_BY_ID, [id])
    if (!rows.length) {
        return { status: 404, message: "User not found" }
    }

    const updatedName = name ?? rows[0].name
    const updatedRole = role ?? rows[0].role

    await pool.query(QUERIES.UPDATE, [updatedName, updatedRole, id])
    const [updated] = await pool.query(QUERIES.FIND_BY_ID, [id])

    return { status: 200, message: "User updated", data: updated[0] }
}

export const deleteUser = async (id,password) => {
    const [rows] = await pool.query(QUERIES.FIND_BY_ID, [id])
    if (!rows.length) {
        return { status: 404, message: "User not found" }
    }
    const checkPassword = await bcrypt.compare(password, rows[0].password)
    if(!checkPassword){
        return { status: 401, message: "Incorrect password" }
    }

    await pool.query(QUERIES.DELETE, [id])
    return { status: 200, message: "User deleted" }
}


export const updatePassword = async (id, password) => {
    const [rows] = await pool.query(QUERIES.FIND_BY_ID, [id])
    if (!rows.length) {
        return { status: 404, message: "User not found" }
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await pool.query(QUERIES.UPDATE_PASSWORD, [hashedPassword, id])
    return { status: 200, message: "Password updated" }
}

export const getPassword = async (id) => {
    const [rows] = await pool.query(QUERIES.FIND_PASSWORD, [id])
    if (!rows.length) {
        return { status: 500, message: "Internal server error" }
    }
    return { status: 200, message: "Password fetched", data: rows[0].password }
}