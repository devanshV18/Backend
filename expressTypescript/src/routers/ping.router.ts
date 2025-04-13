import express, {Request, Response, NextFunction} from 'express';
import { pingHandler } from '../controllers/ping.controller';

const pingRouter = express.Router()

//defining tqo middleware signatures
function middleware1(req:Request, res: Response, next:NextFunction){
    console.log("Middleware 1")
    next()
}

function middleware2(req:Request, res: Response, next:NextFunction){
    console.log("Middleware 2")
    next()
}

//now we need to chain them which can be done as below (line 19s) where we created a chain of functions starting from middleware1 hence the incoming req on /ping route is forwared to middleware1 , then middleware1 passes it to middleware 2 and finally middlewware passes it to pingHandler.
//Technically pingHandler is the also a middleware / controller but since its the last middleware, there is no next parameter defined in its decision whcih we can see in the pingHandler function in ping.controller.ts file.
pingRouter.get('/ping', middleware1, middleware2, pingHandler)

export default pingRouter