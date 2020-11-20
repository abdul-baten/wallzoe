import { validate } from '../inputField'
import { upperFirst } from 'lodash'

// trimp space from string
export const trimSpace = _value => {
  let value = _value.toString()
  value = value.trim()
  value = value.replace(/\s+/g, '')
  return value
}

// onChangeHandler for update input state/value when typing
export const onChangeHandler = function (fieldName, event) {
  const setterMethodName = `set${upperFirst(fieldName)}`
  this[setterMethodName]({
    value: event.target.value.toString(),
    isValid: true,
    errMsg: ''
  })
}

export const validationHandler = async function (name, required, ref = '') {
  const setterMethodName = `set${upperFirst(name)}`
  const value = this[name].value
  let validationOptions = { required }
  if (ref) {
    validationOptions = { required, ref }
  }
  const validation = await validate(value, name, validationOptions)

  // validation for others restriction
  if (validation !== true) {
    /*
      update global state of redux with callback
      when validation returns error
      */
    this[setterMethodName]({
      value,
      isValid: false,
      errMsg: validation
    })
  } else if (validation === true) {
    /*
      update global state of redux with callback
      when validation is ok
      */
    this[setterMethodName]({
      value,
      isValid: validation,
      errMsg: ''
    })
  }
}
