import {
  TOGGLE_SIGN_UP,
  TOGGLE_SIGN_IN,
  USERNAME,
  EMAIL,
  PASSWORD,
  CONFIRM_PASSWORD,
  USERNAME_OR_EMAIL,
  SIGN_IN_PASSWORD
} from './types'

export const toggleToSignUp = () => {
  return {
    type: TOGGLE_SIGN_UP
  }
}

export const toggleToSignIn = () => {
  return {
    type: TOGGLE_SIGN_IN
  }
}

export const setUsername = username => {
  return {
    type: USERNAME,
    username
  }
}
export const setEmail = email => {
  return {
    type: EMAIL,
    email
  }
}
export const setPassword = password => {
  return {
    type: PASSWORD,
    password
  }
}
export const setConfirmPassword = confirmPassword => {
  return {
    type: CONFIRM_PASSWORD,
    confirmPassword
  }
}
export const setUsernameOrEmail = usernameOrEmail => {
  return {
    type: USERNAME_OR_EMAIL,
    usernameOrEmail
  }
}
export const setSignInPassword = signInPassword => {
  return {
    type: SIGN_IN_PASSWORD,
    signInPassword
  }
}
