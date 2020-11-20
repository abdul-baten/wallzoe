import { Express } from 'express'
import { IConfig } from 'config'
import { PassportStatic } from 'passport'
import session, { SessionOptions } from 'express-session'
import connectMongoDB from 'connect-mongodb-session'

import { dbURI } from './db'

const MongoDBStore = connectMongoDB(session)
const store = new MongoDBStore({
  uri: dbURI,
  collection: 'sessions'
})

export default (app: Express, passport: PassportStatic, config: IConfig) => {
  const IS_PROD = config.get('nodeEnv') === 'production'

  const sessionProps: SessionOptions = {
    store,
    name: config.get('sessName'),
    secret: config.get('sessSecret'),
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
      httpOnly: true,
      secure: IS_PROD
    }
  }
  app.use(session(sessionProps))
}
