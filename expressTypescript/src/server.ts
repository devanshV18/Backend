import express from "express"
import {serverConfig} from "./config"
// import { pingHandler } from "./controllers/ping.controller"
import pingRouter from "./routers/ping.router"

const app = express() //implicitly app is of type express.Application 

// const PORT:number = 3004 //explicit type definition other than this POR automatically assumes the type of PORT as the type od data you are assigning to it


//NOTE - When we are handling the request inside the get function directly be defining the callback here itself, typescript is able to implicitly understand the type of req, res parameter

//connecting my all registered routes to the server/app instance
app.use(pingRouter)

 
app.listen(serverConfig.PORT, () => {
    console.log(`Server is running on ${serverConfig.PORT}`)
    console.log("Press CTRL + C to stop the server")
})