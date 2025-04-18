//config file for our logger/logger object using winston

import winston from "winston"
import { getCorrelationId } from "../utils/helpers/request.helpers"
import DailyRotateFile from "winston-daily-rotate-file"

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
            const output = {level,
                message,
                timestamp, 
                correlationId:getCorrelationId, 
                data}
            // console.log(output) logging line for understanding purpose and visulisation of our logger object
            return JSON.stringify(output) //converts the log into a stringified object/JSON for custom printing.
        })
    ),
    //transports is an array to accomodate multiple destinations.
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: "logs/%DATE%-app.log",
            datePattern: "YYYY-MM-DD",
            maxSize: "20m", //maxs size of the log file
            maxFiles: "14d", //max number of files to keep in terms of trainling days
        })
    ]
})


//important scenario -> in production, multiole users will be sending req to the server and hence in whatever destination we decide, we are going to have multiple logs coming in the same time from multiple request. that is for example in a file we might have 2 logs from req 1 and the 3 logs from a parallel request req 2 and then from req 3 and so on etc. So how do we segregate the logs for each request ? => we can use the concept of corelation id.
//corelation id -> A unique id added to every log of a single request which makes them identifiable to a single request and this corelation id is a unique id generated for each request.

//step 1 -> A unique id generator to gen unique ids
//step 2 -> embed the generated unique id in the current request 
//how to embed uuid to current req -> lets create a middleware function which is placed before the routing layer kicks in and the middleware accesses the req,res,next of the req as its a middleware, so the middleware fxn can access req object and embed a uuid in it and then call next() to pass the control to the next middleware or more specifically the routing layer.

// ⚠️ the above approachg works well and good with requests pertaining to our REST APIs but suppose a part of our backend is some thing like a background process or a cron job or a scheduled event. Such jobs/processes/events doesn't take a traditional route of req-response cycle where the req comes and it is attached to a uuid before routing later then further it is processed with different middlewares rather such jobs might directly invoke a certain section of our code most likely in our service layer such as _> sending emails, sending notifs etc, so such jobs/ processes's logs wont get a corelation id and wont be handled well with this approach.


//Probable fix -> Async Storage Node js (To handle not just background jobs(async background jobs -> using 3rd party mailers for example) but also embedding correlation id or unique to any async op or request)
//What it does -> For each async request that is present in our backend, we have a corresponding async storage specific for each async operation/request. 

//asynclocalstorage can be used to build a simple logger that assigns id to incoming http request and includes them in messages logged within each request. This is the exact problem we need to solve.


//THE FINAL FLOW OF OUR GENERALISED LOGGING MECH WHICH HANDLES ALL CASES -> At any point in our code whenever a logger object is called by .info, .warn etc, the controls comes to inside an async operation in the entire code base comes to logger.ts and then creates the logger object as per our passed configurations. As per our configs we are adding timestamp, converting the object into a JSON, define a custom print where we are passing timeline, message (from logge call), data (from logger call), and correlationID. we are getting this correlation id from the function getCorrealtionID in request.helpers.ts file. How are we getting the correlation id -> we have updated the implementation of attachCorrelationID which runs for each context/request/async op individually middleware by making it much more generalised by eliminating adding the correlation id to our headers instead we use async Local stroage with run function that adds the correaltion id to each async operation when invoked -> hecnce all REST api req and any other individual async operation gets covered and in the logging loop.

export default logger