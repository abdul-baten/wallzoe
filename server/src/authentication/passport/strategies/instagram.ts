import passportInstagram, { Profile } from 'passport-instagram'
import config from 'config'
import url from 'url'

import SocialAccount from '../../../models/SocialAccount'

const strategy = passportInstagram.Strategy

export default new strategy(
  {
    clientID: config.get('instagram.clientID'),
    clientSecret: config.get('instagram.clientSecret'),
    callbackURL: url.resolve(
      config.get('serverURL'),
      config.get('instagram.callbackPath')
    ),
    profileFields: ['id', 'username', 'profile_picture'],
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
      accountType: 'instagram',
      accessToken: accessToken,
      userName: profile.username,
      pictureUrl: profile._json.data.profile_picture,
    }
    await SocialAccount.findOneAndUpdate(query, upsert, options).exec()

    return done(null, profile)
  }
)

