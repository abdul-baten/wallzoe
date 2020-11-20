import React from 'react'

import {
  UsernameOrEmailField,
  SignInPasswordField,
  SubmitButton
} from '../../InputFields'

const signInForm = props => {
  return (
    <form autoComplete="off" onSubmit={props.signInHandler} noValidate>
      <UsernameOrEmailField />
      <SignInPasswordField />
      <SubmitButton label="Sign In" />
    </form>
  )
}

export default signInForm
