import { Express } from 'express'
import { PassportStatic } from 'passport'
import config from 'config'
import url from 'url'

export default (app: Express, passport: PassportStatic) => {
  app.get(
    config.get('facebook.callbackPath'),
    passport.authenticate('facebook', {
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

  // Facebook page authentication
  app.get(
    config.get('facebook.pageAuthPath'),
    passport.authenticate('facebook', {
      authType: 'reauthenticate',
      scope: ['email', 'manage_pages', 'publish_pages'],
      session: true
    })
  )

  // Facebook group authentication
  app.get(
    config.get('facebook.groupAuthPath'),
    passport.authenticate('facebook', {
      authType: 'reauthenticate',
      scope: ['email', 'publish_to_groups'],
      session: true
    })
  )
}
