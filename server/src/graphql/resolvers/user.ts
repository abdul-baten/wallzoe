import { Request, Response } from 'express'
import Joi from '@hapi/joi'
import { isEmpty } from 'lodash'

import { User, UserInputSignUp, userInputSignIn } from '../../models/'
import {
  signUpFields,
  signInFields,
  username,
  email,
  ID
} from '../../validation/joiSchema/'
import { dbErr, valErr } from '../../debuggers/debug'
import { signInProcess, signOutProcess } from '../../authentication/utils'
import { Schema } from 'mongoose'

export default {
  Query: {
    hasUsername: async (
      _: null,
      { username: inputUsername }: { username: string }
    ) => {
      await Joi.validate(inputUsername, username)
      const user = await User.findOne({ username: inputUsername }).exec()
      return user ? true : false
    },
    hasEmail: async (_: null, { email: inputEmail }: { email: string }) => {
      await Joi.validate(inputEmail, email)
      const user = await User.findOne({ email: inputEmail }).exec()

      return !isEmpty(user) ? true : false
    },
    hasUserById: async (_: null, { userId }: { userId: string }) => {
      await Joi.validate(userId, ID)
      const user = await User.findById(userId).exec()
      return !isEmpty(user) ? true : false
    },
    hasAllUsers: async (_: null) => {
      const users = await User.find().exec()
      return users
    }
  },
  Mutation: {
    signUp: async (
      _: null,
      args: UserInputSignUp,
      { req }: { req: Request }
    ) => {
      if (!isEmpty(args) && !isEmpty(signUpFields)) {
        try {
          // validation
          await Joi.validate(args, signUpFields, { abortEarly: false })
          try {
            const user = await User.create(args)

            if (user) {
              req.session.userId = user.id
              return { ...user._doc, password: null }
            }
          } catch (err) {
            dbErr(err)
            return err
          }
        } catch (err) {
          valErr(err)
          return err
        }
      }
    },
    signIn: async (
      _: null,
      args: userInputSignIn,
      { req }: { req: Request }
    ) => {
      const { userId } = req.session
      if (userId) {
        try {
          const user = await User.findById(userId).exec()
          if (user) {
            return user
          }
        } catch (err) {
          dbErr(err)
        }
      }
      try {
        // validation
        await Joi.validate(args, signInFields, { abortEarly: false })
        const user = await signInProcess(args.usernameOrEmail, args.password)
        if (user) {
          req.session.userId = user.id
          return user
        }
      } catch (err) {
        valErr(err)
      }
    },
    signOut: async (
      _: null,
      __: null,
      { req, res }: { req: Request; res: Response }
    ) => {
      return await signOutProcess(req, res)
    }
  }
}
