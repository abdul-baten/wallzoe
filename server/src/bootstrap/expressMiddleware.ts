import { Express } from 'express'
import { PassportStatic } from 'passport'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

export default (app: Express, passport: PassportStatic) => {
  // using middleware
  app.use(helmet())
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(passport.initialize())
  app.use(passport.session())
}
