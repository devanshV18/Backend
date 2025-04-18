import {NextFunction, Request, Response } from "express"
import fs from "fs/promises"
// import { UnauthorizedError } from "../utils/errors/app.error"
import logger from "../config/logger"


//NOTE - here since we are handling the CALLBACK INDEPENDENTLY we need to explicitly define the type of req and res parameter -> here we are explicitly defining req and res as Express Request and Express Response respectively and also defined the return type of the function as void
// export const pingHandler = async(req: Request,res: Response) :Promise<void> => {
//     res.status(200).json({
//         message: "Pong",
//         success: true
//     })
// }

export const pingHealthHandler = async(req: Request, res: Response) :Promise<void> => {
    res.status(200).send("Ping Health Check Done!")
}



//ERROR HANDLING DEMO COMMENT ABOVE CODE ENTIRELY FOR THIS TO WORK

//synchronous error handling in Postman request
// export const pingHandler = (req:Request, res: Response) => {
//     throw new Error("Test Error") //Manually throwing error -> it will be handled automatically by express -> No Problem.

//     //unreachable code below as soon as throw is hit
//     res.status(200).json({
//         message: "Pong",
//         success: true
//     })
// }



//Asynchronous error handling in Express with Postman demo -> comment above pingHandler function for this to run
//in this case error wont be handled.
// export const pingHandler = (req:Request, res:Response, next: NextFunction) :void => {
//     fs.readFile("sample", (err, data) => {
//         if(err){
//             throw new Error("Something went wrong while we read the data")
//         }
//         console.log(data.toString())
//     })
//     //unreachable code -> as no file named sample exist and this is a file read call which is an async code hence throwing will not be caught by express and will crash the server. -> As per express js we dont handle async errors manually.
//     res.status(200).json({
//         message: "Pong",
//         success: true
//     })
// }


//handling the above error:- comment pingHandler anywhere above
// using try catch

//this still not works -> i.e. try catch isn't able to handle this async error.
// export const pingHandler = (req: Request, res:Response) :void => {
//     try {
//         fs.readFile("sample", (err,data) => {
//             if(err){
//                 throw new Error("Something went wrong while we read the data")
//             }
//             console.log(data.toString())
//         })
//     } catch (error) {
//         console.log("Inside Catch block")
//         res.status(500).json({
//             success: false,
//             error: error
//         })
//     }
// }

//What express says about handling errors from async operations -> it says if we get an async error, either pass it to the next() which directs your error to the default error handler of express injected at the end of your code flow in route handlers OR handle it by yourself by calling a custom error handler function.

//trying the default middleware to handle error -> comment all pingHandler above

//in the below code, the default express handler works to handle our error by calling next(err) and passing the error to the default error handler of express which is defined in the server.ts file. Hence we are not using try catch here as we are not handling the error ourselves but passing it to express default error handler.The error handling request follows a default express structuring for response but our server doesn't crash.
 
// export const pingHandler = (req:Request, res:Response, next: NextFunction) :void => {
//     //async flow starts here
//     fs.readFile("samele", (err,data) => {
//         if(err){
//             console.log("Error reading file")
//             next(err) //calling the next mw
//         }
//     })

//     res.status(200).json({
//         success:true,
//         message:"pong"
//     })
// }

//error handling in async functions using try and catch by concept of promises being resolved or rejected -> comment all ping Hnalder above

//NOTE -> // ⚠️ An async function always returns a promise, an async function always returns a Promise, even if you return a simple value like a number or string—it will be wrapped in a resolved Promise. The try-catch block is used inside the async function to handle errors thrown by await expressions.

//the below code also works to handle asyn errors in a manual and custom way without calling express default error handler. but we should write a more modular code to make changes in a single place.

//at line 7, the promise got rejected(since there is no file named as sample) -> we jump inside catch block and below that a response is also sent.

// export const pingHandler = async(req:Request, res:Response, next: NextFunction) :Promise<void> => {
//     try {
//        await fs.readFile("sample")
//        res.status(200).json({message: "pongg"})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({messae: "Internal Server Error"})
//     }
// }


//custom error handling -> comment all pingHandlers above

export const pingHandler = async(req:Request, res:Response, next: NextFunction) :Promise<void> => {
    try {
       await fs.readFile("sample")
       res.status(200).json({message: "pongg"})
    } catch (error) {
        next(error) //calls the custom error middleware if we have placed one in server.ts else calls the default error handler.
    }
}



//NOTE -> IN EXPRESS 5, in an async operation whenever a promise is rejected(Promise fails) at the await line it automatically calls the error handling middleware -> calls the default one if we haven't placed our custom middleware and calls the custom middleware if we have placed a custom middleware in the server.ts

// export const pingHandlerFeature = async(req:Request, res:Response, next: NextFunction) :Promise<void> => {
    
//     await fs.readFile("sample") //this line automatically calls next upon a promise getting rejected.
//     res.status(200).json({message: "pongg"})

// }


//using the custom error handler using throw keyword and making it one level more custom -> comment all other ping Handler.

// export const pingHandlerFeature = async(req:Request, res:Response, next: NextFunction) :Promise<void> => {
    
//     try {
//         await fs.readFile("sample")  //gets rejected and the flow go to line 143
//         res.status(200).json({message : "Hemlo"})
//     } catch (error) {
//         throw new Error("File Not found") //this thrown error will also be caught by the custom error handler middleware in the server.ts file.The thrown error will be accepted by the custom error handler in the err paramenter
//     }
// }


//using a god custom error handler

// export const pingHandlerFeature = async(req:Request, res:Response, next: NextFunction) :Promise<void> => {
    
//     try {
//         await fs.readFile("sample")  //gets rejected and the flow go to line 143
//         res.status(200).json({message : "Hemlo"})
//     } catch (error) {
//         throw new UnauthorizedError("Unauthorised !")

//         //in the above line we are throwing an error object whose type is Internal Server Error which implements AppError -> means it has property of Error class (default props), AppError(statusCode)and InternalServerError(name, message) This error object will be caught by the custom error handler/default error handler middleware in the server.ts file as every InernalServerError is an AppError The thrown error will be accepted by the custom error handler in the err paramenter as its type is already defined as AppError.
//     }
// }

//handler for logger demo -> comment all other pingHandler

export const pingHandlerFeature = async(req:Request, res:Response, next: NextFunction) :Promise<void> => {
   logger.info("Ping request called", {correlationid : req.headers['x-correlation-id']})
   res.status(200).json({
    message: "pong",
    success: true
   })
}
