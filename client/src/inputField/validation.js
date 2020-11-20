import { hasUsername, hasProjectName, hasEmail, hasProjectTodoName } from '../graphql'

export const validateUsername = async value => {
  if (value) {
    if (value.length < 4) {
      return 'Username length must be at least 4 characters long'
    } else if (value.length > 50) {
      return 'Username exceeds maximum length'
    }
    const alphaNumPattern = /^[a-zA-Z0-9]+$/
    if (!alphaNumPattern.test(value)) {
      return 'Username must only contain alpha-numeric characters'
    }

    if (await hasUsername(value)) {
      return 'Username already have taken'
    }

    return true
  }
}

export const validateEmail = async value => {
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!emailPattern.test(value)) {
    return 'Please enter a valid email address'
  }

  if (await hasEmail(value)) {
    return 'Email address already have taken'
  }

  return true
}

export const validatePassword = value => {
  if (value) {
    const nonSpacePattern = /^\S+$/
    if (!nonSpacePattern.test(value)) return 'White space not allowed'

    if (value.length < 8)
      return 'Password length must be at least 8 characters long'
    else if (value.length > 50) return 'Username exceeds maximum length'

    const passPattern = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,50}$/
    if (!passPattern.test(value)) {
      return [
        'One uppercase character A-Z',
        'One lowercase character a-z',
        'One number 0-9',
        'One special character !, @, #, $, % etc'
      ]
    }

    return true
  }
}

export const validateConfPass = (value, ref) => {
  if (value) {
    if (ref !== value) return "Password doesn't match"
    return true
  }
}


/*
 * Project Validation 
 */
export const validateProjectname = async (value, isEdit) => {
  if (value) {
    if (!isEdit) {
      if (await hasProjectName(value)) {
        return 'Projectname already have taken'
      }
      return true
    }
    return true
  }
}

/*
 * Project Todo Validation 
 */
export const validateProjectTodoName = async (value, isEdit) => {
  if (value) {
    if (!isEdit) {
      if (await hasProjectTodoName(value)) {
        return 'ProjectTodoName already have taken'
      }
      return true
    }
    return true
  }
}