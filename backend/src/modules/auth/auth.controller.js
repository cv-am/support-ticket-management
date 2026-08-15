import * as authService from "./auth.service.js"
import { success } from "../../utils/apiResponse.js"

export const register = async (req, res) => {
    const response = await authService.register(req.body)
    res.cookie("token",response.token,{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 3600000
    })
    return success(res, response.status, response.message, response.data)
}

export const login = async (req, res) => {
    const response = await authService.login(req.body)
    res.cookie("token",response.token,{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 3600000
    })
    return success(res, response.status, response.message, response.data)
}

export const logout = async (req, res) => {
    res.clearCookie("token")
    return success(res, 200, "Logged out")
}