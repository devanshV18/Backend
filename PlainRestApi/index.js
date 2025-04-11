//http module of node js can help us in create http servers.

const http = require('http')

//setting up a bascic hhtp server -> detrmine the ip (my machine) and i can decide a PORT

const PORT  = 3000 // defined a variable that stores the value of the PORT we will use

//the server variables stores the server object which is a fully fledged http server and all of the logic facilitating a http server (tcp connection) is already written. The createserver node js functions handles it.

//the below line has configured our server but it is yet not running
const server = http.createServer(async (req, res) => {
    //whenever a req hits my server, this function will be called and the req and res objects will be passed to it.
    console.log("Request received")

    if(req.method == "GET"){
        //by default response code is 200
        res.end("Get request received")
    }
    else if(req.method == "POST"){
        //adding a custom response code
        res.writeHead(201)
        res.end("Post request received")
    }else {
        res.end("Hello world")//the response is a plain simple string for any request other than get and post
    }
    //the response is a plain simple string for any request method as we are not specifying any methods

})  

//attach the server to the port
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})