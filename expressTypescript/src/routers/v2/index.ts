import express from 'express'
import pingRouter from '../v1/ping.router'

const v2router = express.Router()

v2router.use('/ping', pingRouter ) //we are able to use "v1.router.use here because we are calling pingRouter which has the final logic to handle the request hence we call it by using use and passing pingRouter object as we passed the v1router in server.ts to the app instance"


export default v2router