import express from 'express'
import pingRouter from './ping.router'

const v1router = express.Router()

v1router.use('/ping', pingRouter ) //we are able to use "v1.router.use here because we are calling pingRouter which has the final logic to handle the request hence we call it by using use and passing pingRouter object as we passed the v1router in server.ts to the app instance"


export default v1router