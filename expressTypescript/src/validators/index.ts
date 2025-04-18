import { Request, Response, NextFunction } from "express";

import {AnyZodObject} from "zod"
import logger from "../config/logger";


//schema -> The expectation according to which we want to validate the req body -> Expectations
// returns a on the fly async middleware function (a function having access to req, res and next) that asynchronously processes the validation logic for us. If the validation is well and good it passes the req to next middle ware, and validation fails -> an error is generated and handled in the catch block 
export const validateRequest = (schema: AnyZodObject) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        try{
            logger.info("Validating request body", {correlationid : req.headers['x-correlation-id']})
            await schema.parseAsync(req.body)
            logger.info("Validation Successfull", {correlationid : req.headers['x-correlation-id']})
            next()
        }catch(error){
            logger.info("Validation Failed", {correlationid : req.headers['x-correlation-id']})
            res.status(400).json({
                message: "Invalid request body",
                success: false,
                error: error
            })
        }
    }
}


//similar function for validating query params

export const validateQueryParams = (schema: AnyZodObject) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        try{
            await schema.parseAsync(req.query)
            console.log("Validation successfull")
            next()
        }catch(error){
            res.status(400).json({
                message: "Invalid request body",
                success: false,
                error: error
            })
        }
    }
}



