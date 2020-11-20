import passportLinkedIn, { Profile } from '@sokratis/passport-linkedin-oauth2'
import config from 'config'
import url from 'url'

import SocialAccount from '../../../models/SocialAccount'
const Strategy = passportLinkedIn.Strategy
export default new Strategy(
  {
    clientID: config.get('linkedin.clientID'),
    clientSecret: config.get('linkedin.clientSecret'),
    callbackURL: url.resolve(
      config.get('serverURL'),
      config.get('linkedin.callbackPath')
    ),
    scope: ['r_emailaddress', 'r_liteprofile'],
    state: true
  },
  function(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void
  ) {
    process.nextTick(async function() {
      const query = { accountId: profile.id }
      const options = {
        upsert: true,
        strict: false,
        new: true,
        setDefaultOnInsert: true
      }
      const upsert = {
        accountType: 'linkedin',
        accessToken: accessToken,
        email: profile.emails[0].value,
        pictureUrl: profile.photos[0].value
      }
      await SocialAccount.findOneAndUpdate(query, upsert, options).exec()

      return done(null, profile)
    })
  }
)
