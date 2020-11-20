import passportTwitter, { Profile } from 'passport-twitter'
import url from 'url'
import config from 'config'

import SocialAccount from '../../../models/SocialAccount'

const strategy = passportTwitter.Strategy

export default new strategy(
  {
    consumerKey: config.get('twitter.consumerKey'),
    consumerSecret: config.get('twitter.consumerSecret'),
    callbackURL: url.resolve(
      config.get('serverURL'),
      config.get('twitter.callbackPath')
    ),
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void
  ) => {
    const query = { accountId: profile.id }
    const options = {
      upsert: true,
      strict: false,
      new: true,
      setDefaultOnInsert: true,
    }
    const upsert = {
      accountType: 'twitter',
      accessToken: accessToken,
      userName: profile.username,
      pictureUrl: profile.photos[0].value,
    }
    await SocialAccount.findOneAndUpdate(query, upsert, options).exec()
    return done(null, profile)
  }
)

