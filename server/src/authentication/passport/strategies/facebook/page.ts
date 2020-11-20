import request from 'request-promise'
import config from 'config'

import { Profile } from 'passport-facebook'

import { APIErr, dbErr } from '../../../../debuggers/debug'
import SocialAccount from '../../../../models/SocialAccount'

type Page = {
  id: string
  name: string
  access_token: string
  picture: {
    data: {
      url: string
    }
  }
}

export default async (
  accessToken: string,
  profile: Profile,
  done: (error: any, user?: any, info?: any) => void
) => {
  try {
    const fbAPIOptions = {
      method: 'GET',
      uri: `${config.get('facebook.APIEndpoint')}/${profile.id}/accounts`,
      qs: {
        access_token: accessToken,
        fields: 'id, name, picture, access_token'
      },
      json: true
    }

    const response = await request(fbAPIOptions)
    const pages = response.data.map((page: Page) => {
      return {
        id: page.id,
        name: page.name,
        accessToken: page.access_token,
        pictureUrl: page.picture.data.url
      }
    })
    const query = { accountId: profile.id, accountType: 'facebook-page' }
    const options = {
      upsert: true,
      strict: false,
      new: true,
      setDefaultOnInsert: true
    }
    const upsert = { accessToken, pages }
    try {
      await SocialAccount.findOneAndUpdate(query, upsert, options).exec()
      return done(null, profile)
    } catch (err) {
      dbErr(err)
      return done(err, null)
    }
  } catch (err) {
    APIErr(err)
    return done(err, null)
  }
}
