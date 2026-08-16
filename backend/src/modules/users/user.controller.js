import * as userService from "./user.service.js"
import { success } from "../../utils/apiResponse.js"

export const getAll = async (req, res) => {
    const response = await userService.listUsers(req.query)
    return success(res, response.status, response.message, response.data)
}

export const getOne = async (req, res) => {
    const response = await userService.getUserById(req.user.id)
    return success(res, response.status, response.message, response.data)
}

export const update = async (req, res) => {
    const response = await userService.updateUser(req.params.id || req.user.id, req.body)
    return success(res, response.status, response.message, response.data)
}

export const remove = async (req, res) => {
    const response = await userService.deleteUser(req.params.id || req.user.id, req.body)
    return success(res, response.status, response.message)
}

export const updatePassword = async (req, res) => {
    const response = await userService.updatePassword(req.user.id, req.body.password)
    return success(res, response.status, response.message)
}
