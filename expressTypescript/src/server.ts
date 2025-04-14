import express from "express"
import {serverConfig} from "./config"
// import { pingHandler } from "./controllers/ping.controller"
// import pingRouter from "./routers/ping.router"
import v1router from "./routers/v1"
import v2router from "./routers/v2"
// import { z } from "zod"

const app = express() //implicitly app is of type express.Application 

app.use(express.json()) //this is used to parse the incoming request with JSON payloads. It is based on body-parser. The body-parser package is a middleware that parses incoming request bodies in a middleware before your handlers, available under the req.body property. It parses the text as JSON and exposes the resulting object on req.body.
app.use(express.urlencoded({extended: true})) //this is used to parse the incoming request with url encoded payloads. The extended option allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. If false, it will use the querystring library (when `false`), or the qs library (when `true`) for parsing.
app.use(express.text())

// const PORT:number = 3004 //explicit type definition other than this POR automatically assumes the type of PORT as the type od data you are assigning to it


//NOTE - When we are handling the request inside the get function directly be defining the callback here itself, typescript is able to implicitly understand the type of req, res parameter

//connecting my all registered routes to the server/app instance
app.use('/api/v1', v1router)
app.use('/api/v2', v2router)

 
app.listen(serverConfig.PORT, () => {
    console.log(`Server is running on ${serverConfig.PORT}`)
    console.log("Press CTRL + C to stop the server!")

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