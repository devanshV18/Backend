//config file for our logger/logger object using winston

import winston from "winston"

//create logger function -> we can use a create logger function to create our logger object. How the logger should work will totally depend on the configuration we pass to the create logger function.

//some important points related to logger configuration:-
//1. transports -> transports property of the logger object determines where should the  corresponding logs go, i.e destination of the logs. The destination may putting the logs as prints on console, add them to a file, add them to a file as well as print them on console, put it in a  db or even any combination etc.

//2. Formats - it detrmine when a corresponding log comes up what should be the format of the appearance of the log i.e what should it write, display or contain like timestamp, log level, message etc

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss"}),
        winston.format.json(), //formats our logs which is made up of of all the combined configuration to json
        //the printf function lets us define a custom log printig function where we can include exclude things we want to print in the log from the combined configuration
        winston.format.printf(({timestamp, level, message, ...data}) => {
            const output = {level,message,timestamp, data}
            // console.log(output) logging line for understanding purpose and visulisation of our logger object
            return JSON.stringify(output) //converts the log into a stringified object/JSON for custom printing.
        })
    ),
    //transports is an array to accomodate multiple destinations.
    transports: [
        new winston.transports.Console()
    ]
})


//important scenario -> in production, multiole users will be sending req to the server and hence in whatever destination we decide, we are going to have multiple logs coming in the same time from multiple request. that is for example in a file we might have 2 logs from req 1 and the 3 logs from a parallel request req 2 and then from req 3 and so on etc. So how do we segregate the logs for each request ? => we can use the concept of corelation id.
//corelation id -> A unique id added to every log of a single request which makes them identifiable to a single request and this corelation id is a unique id generated for each request.

//step 1 -> A unique id generator to gen unique ids
//step 2 -> embed the generated unique id in the current request 
//how to embed uuid to current req -> lets create a middleware function which is placed before the routing layer kicks in and the middleware accesses the req,res,next of the req as its a middleware, so the middleware fxn can access req object and embed a uuid in it and then call next() to pass the control to the next middleware or more specifically the routing layer. 
//step 3 -> 

export default logger