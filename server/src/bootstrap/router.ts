import { Express } from 'express'
import { PassportStatic } from 'passport'
import facebookRoutes from '../routes/socialMedia/facebook'
import instagramRoutes from '../routes/socialMedia/instagram'
import linkedinRoutes from '../routes/socialMedia/linkedin'
import twitterRoutes from '../routes/socialMedia/twitter'

//router
export default (app: Express, passport: PassportStatic) => {
  facebookRoutes(app, passport)
  instagramRoutes(app, passport)
  linkedinRoutes(app, passport)
  twitterRoutes(app, passport)
}
