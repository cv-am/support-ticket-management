import * as authService from "./auth.service.js"

export const register = async (req, res) => {
    const response = await authService.register(req.body)
    res.cookie("token",response.token,{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 3600000
    })
    return res.status(response.status).json({
        message:response.message
    }
    )
}

export const login = async (req, res) => {
    const response = await authService.login(req.body)
    res.cookie("token",response.token,{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 3600000
    })
    return res.status(response.status).json({
        message:response.message
    }
    )
}