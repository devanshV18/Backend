const express = require('express')

const app = express()
const PORT = 3001

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', (req,res) => {
    res.send("Hello world post")
})

app.post('/tweet', (req,res) => {
    res.send("New Tweet Posted")
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})