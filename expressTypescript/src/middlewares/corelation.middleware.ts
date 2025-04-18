import { Request, Response, NextFunction } from "express"
import { v4 as uuidv4 } from "uuid"
import { asyncLocalStorage } from "../utils/helpers/request.helpers"

// export const attachCorrelationId = (req:Request, res:Response, next:NextFunction) => {
//     const correaltionId = uuidv4()
//     req.headers['x-correlation-id'] = correaltionId//setting the header of the response object with the generated unique id
//     next()
// }

//middleware function for async operation in general -> this handles all operations including REST API calls as well as any async op in general comment above fxn

export const attachCorrelationId = (req:Request, res:Response, next:NextFunction) => {
    const correaltionId = uuidv4()
    //the run function in used to call the current context i.e. current local storage or a specific local storage for each async operation and the first parameter is the data we need to pass and store in the asyncLocal storage, This data will be present in the entire req,res cycle of our request/async op in our case, a correaltion id. Also the next parameter is used to return the actual return value of our current function which is a middleware function in our case. So the run function will return the next()
    asyncLocalStorage.run({correlationId: correaltionId}, () => {
        next() //⚠️ whatever function we call here, inside the second parameter of the run fxn which is a call back will be treated as an individual async context, hence all incming req comes here to generate their correaltion id and then gets treated as an async context from here on as the next middleware directs the request to the routing layer where we further have our implementations, middleares etc.
    })
}