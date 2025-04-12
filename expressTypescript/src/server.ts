import express from "express"

const app = express() //implicitly app is of type express.Application 

const PORT:number = 3004 //explicit type definition other than this POR automatically assumes the type of PORT as the type od data you are assigning to it

app.get('/ping', (req,res) => {
    res.send("Ping")
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    console.log("Press CTRL + C to stop the server")
})