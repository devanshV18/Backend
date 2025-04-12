//basic config logics
import dotenv from "dotenv"

type ServerConfig = {
    PORT: number
}

function loadenv(){
    dotenv.config() //loads all env vraibles
    console.log("Env vars loaded")
}

loadenv()

export const serverConfig:ServerConfig = {
    PORT: Number(process.env.PORT) || 3030
}