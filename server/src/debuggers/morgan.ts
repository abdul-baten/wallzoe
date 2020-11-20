import { Express } from 'express'
import morgan from 'morgan'

export default (app: Express): void => {
  app.use(morgan('tiny'))
}
