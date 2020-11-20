import { startCase } from 'lodash'
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfPass,
  validateProjectname,
  validateProjectTodoName
} from './validation'

/* validate input fields */
export default async (value, type, options) => {
  if (options.required === true) {
    if (!value) {
      return `${startCase(type)} is required`
    }
  }
  switch (type) {
    case 'username':
      return await validateUsername(value)
    case 'email':
      return await validateEmail(value)
    case 'password':
      return validatePassword(value)
    case 'confirmPassword':
      return validateConfPass(value, options.ref)
    case 'projectName':
      return validateProjectname(value, options.isEdit)
    case 'projectTodoName':
      return validateProjectTodoName(value, options.isEdit)
    default:
      return true
  }
}
