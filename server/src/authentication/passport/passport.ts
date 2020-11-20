import { PassportStatic } from 'passport'
import {
  facebookStrategy,
  instagramStrategy,
  linkedinStrategy,
  twitterStrategy
} from './strategies/'
import SocialAccount from '../../models/SocialAccount'

import { dbErr } from '../../debuggers/debug'

type Profile = {
  id?: string
  provider?: string
  name?: string
  displayName?: string
}
/*
 * serialize and de-serialize user/account information
 * form linked in it is required
 */
export default (passport: PassportStatic) => {
  passport.serializeUser<Profile, string>(function(user, done) {
    done(null, user.id) // user.id store into session
  })

  passport.deserializeUser<any, string>(async function(id, done) {
    try {
      /*
       * Get the account information from SocialAccount with user.id
       * Which is stored in session
       * and hook it with req obj
       * so found the information in req.session.passport.user
       */
      const account = await SocialAccount.findOne({ accountId: id })
      done(null, account)
    } catch (err) {
      dbErr(err)
      done(err, null)
    }
  })
  passport.use(facebookStrategy)
  passport.use(instagramStrategy)
  passport.use(linkedinStrategy)
  passport.use(twitterStrategy)
}
