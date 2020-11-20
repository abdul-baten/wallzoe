// type declaration file for passport-instagram
declare module 'passport-instagram' {
  import passport from 'passport'
  import express from 'express'
  export interface Profile extends passport.Profile {
    _json: any
  }

  export interface StrategyOption {
    clientID: string
    clientSecret: string
    callbackURL: string
    profileFields: Array<string>

    authorizationURL?: string
    tokenURL?: string
  }

  export type VerifyCallback = (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void
  ) => void

  export class Strategy extends passport.Strategy {
    constructor(options: StrategyOption, verify: VerifyCallback)
    name: string
    authenticate(req: express.Request, options?: object): void
  }
}
