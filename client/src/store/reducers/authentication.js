import {
  TOGGLE_SIGN_UP,
  TOGGLE_SIGN_IN,
  USERNAME,
  EMAIL,
  PASSWORD,
  CONFIRM_PASSWORD,
  USERNAME_OR_EMAIL,
  SIGN_IN_PASSWORD
} from '../actions/types'

const initialState = {
  username: {
    value: '',
    isValid: true,
    errMsg: ''
  },
  email: {
    value: '',
    isValid: true,
    errMsg: ''
  },
  password: {
    value: '',
    isValid: true,
    errMsg: ''
  },
  confirmPassword: {
    value: '',
    isValid: true,
    errMsg: ''
  },
  usernameOrEmail: {
    value: '',
    isValid: true,
    errMsg: ''
  },
  signInPassword: {
    value: '',
    isValid: true,
    errMsg: ''
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIGN_IN:
      return { ...state, isSignUp: false }
    case TOGGLE_SIGN_UP:
      return { ...state, isSignUp: true }
    case USERNAME:
      return { ...state, username: action.username }
    case EMAIL:
      return { ...state, email: action.email }
    case PASSWORD:
      return { ...state, password: action.password }
    case CONFIRM_PASSWORD:
      return { ...state, confirmPassword: action.confirmPassword }
    case USERNAME_OR_EMAIL:
      return { ...state, usernameOrEmail: action.usernameOrEmail }
    case SIGN_IN_PASSWORD:
      return { ...state, signInPassword: action.signInPassword }
    default:
      return state
  }
}

export default reducer
