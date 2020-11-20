import SocialAccount from '../../models/SocialAccount'
import { dbErr } from '../../debuggers/debug'

export default {
  Query: {
    socialAccounts: async () => {
      try {
        const accounts = await SocialAccount.find().exec()
        if (Array.isArray(accounts) && accounts.length) {
          return accounts
        }
      } catch (err) {
        dbErr(err)
        return err
      }
    }
  }
}
