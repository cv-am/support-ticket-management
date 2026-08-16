import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../../db/db.js";
import config from "../../config/env.js";
import ApiError from "../../utils/apiError.js";
import QUERIES from "./auth.query.js";

const signToken = (user) =>{
    return jwt.sign(
        { id: user.id, email: user.email, role:user.role },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
    )
}

export const register = async ({ name, email, password, role = "Customer" }) => {
    const [existing] = await pool.query(QUERIES.FIND_BY_EMAIL, [email])
    if (existing.length) {
        throw new ApiError(409, "An account with this email already exists")
    }

    const hashed = await bcrypt.hash(password, 10)
    const [result] = await pool.query(QUERIES.CREATE_USER, [name, email, hashed, role])

    const [rows] = await pool.query(QUERIES.FIND_BY_ID, [result.insertId])
    const user = rows[0]
    const token = signToken(user)
    return {
        status: 201,
        message: "Registration successful",
        token: token
    }
}

export const login = async ({ email, password }) => {
    const [rows] = await pool.query(QUERIES.FIND_BY_EMAIL,[email])
    if (!rows.length) {
        throw new ApiError(401, "Invalid email or password")
    }

    const record = rows[0]
    const match = await bcrypt.compare(password, record.password)
    if(!match) {
        throw new ApiError(401, "Invalid email or password")
    }

    const token = signToken(record)
    return {
        status: 200,
        message: "Login successful",
        token: token
    }
}