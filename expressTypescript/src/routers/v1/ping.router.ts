import express from 'express';
import { pingHandler, pingHealthHandler } from '../../controllers/ping.controller';

const pingRouter = express.Router()


//MIDDLEWARE DEMO BELOW
// `//defining tqo middleware signatures
// function middleware1(req:Request, res: Response, next:NextFunction){
//     console.log("Middleware 1")
//     next()
// }

// function middleware2(req:Request, res: Response, next:NextFunction){
//     console.log("Middleware 2")
//     next()
// }`

//now we need to chain them which can be done as below (line 19s) where we created a chain of functions starting from middleware1 hence the incoming req on /ping route is forwared to middleware1 , then middleware1 passes it to middleware 2 and finally middlewware passes it to pingHandler.
//Technically pingHandler is the also a middleware / controller but since its the last middleware, there is no next parameter defined in its decision whcih we can see in the pingHandler function in ping.controller.ts file.

// NOTE (VVVII) - inorder to get any logs from middlwares or a definite response or log from the terminal middleware, the chaining must appropriately call the next till the control reaches terminal middleware or controller. If any middleware does not call next() then the control will not reach the next middleware or controller and hence no logs or response will be generated. not even partial logs till where next was used.

//ALSO IF WE USE RETURN KEYWORD IN ANY MIDDLEWARE, WE ONLY GET TO SEE ANYLOGS till the middleware which calls IF WE HAVE DEFINED A res before returning in the middleware, it wont be dony by the terminal response.

// pingRouter.get('/ping', middleware1, middleware2, pingHandler)

//MIDDLEWARE DEMO ABOVE

pingRouter.get('/', pingHandler)
pingRouter.get('/health', pingHealthHandler)



export default pingRouter