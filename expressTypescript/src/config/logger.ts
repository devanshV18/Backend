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
            const output = {level,message,data}
            return JSON.stringify(output)
        })
    )
})

export default logger