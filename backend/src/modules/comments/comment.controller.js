import * as commentService from "./comment.service.js"
import { success } from "../../utils/apiResponse.js"

export const create = async (req, res) => {
    const response = await commentService.addComment(req.params.ticketId, req.user.id, req.body.content)
    return success(res, response.status, response.message, response.data)
}

export const getAll = async (req, res) => {
    const response = await commentService.listComments(req.params.ticketId, req.query)
    return success(res, response.status, response.message, response.data)
}

export const update = async (req, res) => {
    const response = await commentService.updateComment(req.params.commentId, req.user, req.body.content)
    return success(res, response.status, response.message, response.data)
}

export const remove = async (req, res) => {
    const response = await commentService.deleteComment(req.params.commentId, req.user)
    return success(res, response.status, response.message)
}
