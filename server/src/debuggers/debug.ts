import debug from 'debug'

export const serverInfo = debug('wallzoe:server')
export const dbErr = debug('wallzoe:db')
export const secretError = debug('wallzoe:secret')
export const APIErr = debug('wallzoe:API')
export const valErr = debug('wallzoe:validation')
