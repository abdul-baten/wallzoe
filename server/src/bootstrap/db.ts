import config from 'config'

const mUser = config.get('mongoUsername')
const mPas = config.get('mongoPassword')
const mHost = config.get('mongoHost')
const mDB = config.get('mongoDB')

export const dbURI = `mongodb+srv://${mUser}:${mPas}@${mHost}/${mDB}?retryWrites=true&w=majority`
