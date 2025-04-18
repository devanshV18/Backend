import express from "express"
import {serverConfig} from "./config"
// import { pingHandler } from "./controllers/ping.controller"
// import pingRouter from "./routers/ping.router"
import v1router from "./routers/v1"
import v2router from "./routers/v2"
import { genericErrorHandler } from "./middlewares/error.middleware"
// import { z } from "zod"
import logger from "./config/logger"
import { attachCorrelationId } from "./middlewares/corelation.middleware"

const app = express() //implicitly app is of type express.Application 

app.use(express.json()) //this is used to parse the incoming request with JSON payloads. It is based on body-parser. The body-parser package is a middleware that parses incoming request bodies in a middleware before your handlers, available under the req.body property. It parses the text as JSON and exposes the resulting object on req.body.
app.use(express.urlencoded({extended: true})) //this is used to parse the incoming request with url encoded payloads. The extended option allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. If false, it will use the querystring library (when `false`), or the qs library (when `true`) for parsing.
app.use(express.text())

// const PORT:number = 3004 //explicit type definition other than this POR automatically assumes the type of PORT as the type od data you are assigning to it


//NOTE - When we are handling the request inside the get function directly be defining the callback here itself, typescript is able to implicitly understand the type of req, res parameter

//adding uuid injection middleware before my request reaches routing layer

app.use(attachCorrelationId)

// VVVIII -> ABOVE THIS LINE ALL MIDDLEWARES ARE PLACED THAT ARE IN THE FLOW BEFORE THE ROUTING LAYER

//connecting my all registered routes to the server/app instance
app.use('/api/v1', v1router)
app.use('/api/v2', v2router)

// VVVIII -> BELOW THIS LINE ALL MIDDLEWARES ARE PLACED THAT ARE IN THE FLOW AFTER THE ROUTING LAYER

//we place our custom error handler (if any) right below all the routes and above app.listen to make sure express injects our custom error handler instead of default one at the end of middleware stack.

app.use(genericErrorHandler )

 
app.listen(serverConfig.PORT, () => {
    console.log(`Server is running on ${serverConfig.PORT}`)
    //the first input is the message and next is the data we want to log. We can pass any number of data to be logged in the log message.
    logger.info(`Press CTRL + C to stop the server`, {PORT: serverConfig.PORT}) 

    // const obj = {
    //     name: "Devansh",
    //     age: 22
    // } //object to be tested

    // //defing a zod schema
    // const objSchema = z.object({
    //     name: z.string(),
    //     age: z.number().int().positive()
    // })

    // //validating -> if validation is successful, it prints the obja nd if not throws an error
    // console.log(objSchema.parse(obj))
})