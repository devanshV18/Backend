import express from "express"
import loadenv from "./config"

const app = express() //implicitly app is of type express.Application 

// const PORT:number = 3004 //explicit type definition other than this POR automatically assumes the type of PORT as the type od data you are assigning to it

app.get('/ping', (req,res) => {
    res.send("Ping")
})

    loadenv()
    console.log("Env vars loaded")

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
    console.log("Press CTRL + C to stop the server")
})