import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import config from 'config'
import passport from 'passport'
// start up modules
import passportAuth from './authentication/passport/passport'
import devOnly from './bootstrap/devOnly'
import winstonLogger from './debuggers/winstonLogger'
import expressSession from './bootstrap/expressSession'
import expressMiddleware from './bootstrap/expressMiddleware'
import allRoutes from './bootstrap/router'
import runServer from './bootstrap/runServer'

const app = express()

// Development only ****
if (app.get('env') !== 'production') {
  devOnly(app)
}
if (app.get('env') !== 'development') {
  winstonLogger(app, config)
}

expressSession(app, passport, config)
expressMiddleware(app, passport)
passportAuth(passport)
allRoutes(app, passport)
runServer(app, config)
