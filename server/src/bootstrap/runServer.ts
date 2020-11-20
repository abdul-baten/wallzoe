import { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { IConfig } from 'config'
import https from 'https'
import fs from 'fs'
import mongoose from 'mongoose'

import { dbURI } from './db'
import typeDefs from '../graphql/typeDefs'
import resolvers from '../graphql/resolvers'
import schemaDirectives from '../graphql/directives'
import { postScheduler } from '../cron'

import { dbErr } from '../debuggers/debug'

export default (app: Express, config: IConfig) => {
  app.set('trust proxy', 1)
  app.disable('x-powered-by')

  const IS_PROD = config.get('nodeEnv') === 'production'
  const PORT = config.get('port') || 5000
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    playground: IS_PROD
      ? false
      : { settings: { 'request.credentials': 'include' } },
    context: ({ req, res }) => ({ req, res })
  })

  const corsOptions = {
    origin: `${config.get('clientURL')}`,
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  apollo.applyMiddleware({ app, cors: corsOptions })

  const options = {
    key: fs.readFileSync(__dirname + config.get('SSLKeyPath')),
    cert: fs.readFileSync(__dirname + config.get('SSLCrtPath'))
  }

  const server = https.createServer(options, app)

  apollo.installSubscriptionHandlers(server)

  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useFindAndModify: false
    })
    .then(res => {
      server.listen(PORT, () => {
        console.info(`Server running on: ${config.get('serverURL')}`)
        postScheduler()
      })
    })
    .catch(err => {
      dbErr(err)
    })
}
