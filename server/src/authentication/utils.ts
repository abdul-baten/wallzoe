import { Request, Response } from 'express'
import { AuthenticationError } from 'apollo-server-core'
import config from 'config'

import User from '../models/User'

export const signInProcess = async (
  usernameOrEmail: string,
  password: string
) => {
  const message = 'Provided credential is not valid, Please try again'

  let user
  const usernamePattern = /^\w+$/

  if (usernamePattern.test(usernameOrEmail)) {
    user = await User.findOne({ username: usernameOrEmail }).exec()
  } else {
    user = await User.findOne({ email: usernameOrEmail }).exec()
  }
  if (!user) throw new AuthenticationError(message)

  const matchPassword = await user.matchPassword(password)
  if (!matchPassword) throw new AuthenticationError(message)

  return user
}

export const signOutProcess = async (
  req: Request,
  res: Response
): Promise<boolean> =>
  new Promise((resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err)
      res.clearCookie(config.get('sessName'))
      resolve(true)
    })
  })

export const isSignedIn = (req: Request) => req.session.userId

/* 
  ensure that user is signed in
  if not then throw an error
*/
export const ensureSignedIn = (req: Request) => {
  if (!isSignedIn(req)) throw new AuthenticationError('You must be signed in')
}

/* 
  ensure that user not signed in
  if that then throw an error
*/
export const ensureSignedOut = (req: Request) => {
  if (isSignedIn(req))
    throw new AuthenticationError('You are already signed in')
}
