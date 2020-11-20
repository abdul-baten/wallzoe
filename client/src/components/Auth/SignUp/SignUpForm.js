import React from 'react'

import {
  UsernameField,
  EmailField,
  PasswordField,
  ConfirmPasswordField,
  SubmitButton
} from '../../InputFields/'

const signUpForm = props => {
  return (
    <form autoComplete="off" onSubmit={props.signUpHandler} noValidate>
      <UsernameField />
      <EmailField />
      <PasswordField />
      <ConfirmPasswordField />
      <SubmitButton label="Create an Account" />
    </form>
  )
}

export default signUpForm
