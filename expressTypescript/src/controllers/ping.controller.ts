import { Request, Response } from "express"


//NOTE - here since we are handling the CALLBACK INDEPENDENTLY we need to explicitly define the type of req and res parameter -> here we are explicitly defining req and res as Express Request and Express Response respectively and also defined the return type of the function as void
export const pingHandler = (req: Request,res: Response) :void => {
    res.send('Ping Check')
}

export const pingHealthHandler = (req: Request, res: Response) :void => {
    res.status(200).send("Ping Health Check Done!")
}