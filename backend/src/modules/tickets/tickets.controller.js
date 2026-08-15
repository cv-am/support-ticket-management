import * as ticketService from "./tickets.service.js"
import { success } from "../../utils/apiResponse.js"

export const create = async (req, res) => {
    const response = await ticketService.createTicket(req.body, req.user.id)
    return success(res, response.status, response.message, response.data)
}

export const getAll = async (req, res) => {
    const response = await ticketService.listTickets(req.user, req.query)
    return success(res, response.status, response.message, response.data)
}

export const getOne = async (req, res) => {
    const response = await ticketService.getTicketById(req.params.id)
    return success(res, response.status, response.message, response.data)
}

export const update = async (req, res) => {
    const response = await ticketService.updateTicket(req.params.id, req.user, req.body)
    return success(res, response.status, response.message, response.data)
}

export const remove = async (req, res) => {
    const response = await ticketService.deleteTicket(req.params.id, req.user)
    return success(res, response.status, response.message)
}
