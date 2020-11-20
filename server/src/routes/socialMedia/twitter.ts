import { Express } from 'express'
import { PassportStatic } from 'passport'
import config from 'config'
import url from 'url'

export default (app: Express, passport: PassportStatic) => {
  app.get(
    config.get('twitter.callbackPath'),
    passport.authenticate('twitter', {
      failureRedirect: url.resolve(
        config.get('clientURL'),
        config.get('authFailureRedirectPath')
      ),
      successRedirect: url.resolve(
        config.get('clientURL'),
        config.get('authSuccessRedirectPath')
      )
    })
  )
}
