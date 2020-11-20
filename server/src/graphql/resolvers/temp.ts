import { Temp } from '../../models/'
import { dbErr } from '../../debuggers/debug'

export default {
  Query: {
    getAuthFor: async () => {
      try {
        const tempData = await Temp.findOne().exec()
        return tempData.authFor
      } catch (err) {
        dbErr(err)
        return err
      }
    }
  },
  Mutation: {
    setAuthFor: async (_: null, { authFor }: { authFor: String }) => {
      const query = {}
      const upsert = {
        $set: {
          authFor
        }
      }
      const options = {
        upsert: true
      }
      try {
        await Temp.updateOne(query, upsert, options).exec()
        return true
      } catch (err) {
        dbErr(err)
        return err
      }
    }
  }
}
