import Joi from '@hapi/joi'

import {
  username,
  email,
  passwordSignUp,
  signInPassword,
  usernameOrEmail
} from './utils'

export const signUpFields = Joi.object().keys({
  username,
  email,
  password: passwordSignUp,
  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .error(new Error("Password doesn't match"))
})

export const signInFields = Joi.object().keys({
  usernameOrEmail,
  password: signInPassword
})
