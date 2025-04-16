import { NextFunction, Request, Response } from "express";

export const genericErrorHandler = (err: any, req:Request, res: Response, next:NextFunction) => {
    res.status(501).json({success: false, message: "Internal Server Error"})
}