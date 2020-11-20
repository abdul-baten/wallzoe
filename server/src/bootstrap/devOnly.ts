import { Express } from 'express'

import { serverInfo } from '../debuggers/debug'
import runMorgan from '../debuggers/morgan'

export default (app: Express) => {
  // Development only ****
  runMorgan(app)
  serverInfo(`App mode: ${app.get('env')}`)
}
