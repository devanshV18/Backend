import { Request, Response, NextFunction } from "express"
import { v4 as uuidv4 } from "uuid"

export const attachCorrelationId = (req:Request, res:Response, next:NextFunction) => {
    const correaltionId = uuidv4()
    req.headers['x-correlation-id'] = correaltionId//setting the header of the response object with the generated unique id
    next()
}