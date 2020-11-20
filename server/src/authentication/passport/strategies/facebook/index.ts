import passportFacebook, { Profile } from 'passport-facebook'
import config from 'config'
import url from 'url'
import { Temp } from '../../../../models'
import pageAccount from './page'
import groupAccount from './group'

const strategy = passportFacebook.Strategy
export default new strategy(
  {
    clientID: config.get('facebook.clientID'),
    clientSecret: config.get('facebook.clientSecret'),
    callbackURL: url.resolve(
      config.get('serverURL'),
      config.get('facebook.callbackPath')
    ),
    passReqToCallback: true,
    profileFields: ['id']
  },
  async (
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void
  ) => {
    const tempData = await Temp.findOne().exec()
    if (tempData.authFor === 'facebook-page') {
      await pageAccount(accessToken, profile, done)
    } else if (tempData.authFor === 'facebook-group') {
      await groupAccount(accessToken, profile, done)
    }
  }
)
