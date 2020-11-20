import React from 'react'
import { connect } from 'react-redux'
import { isEmpty, startCase, upperFirst } from 'lodash'
import { ApolloConsumer, Mutation } from 'react-apollo'
import { toast } from 'react-toastify'

import Button from '@material-ui/core/Button'

import { SIGN_UP } from '../../../graphql'

import {
  toggleToSignIn,
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword
} from '../../../store/actions'
import { SignUpForm } from '../../../components'

import commonClasses from '../Auth.module.scss'

class SignUp extends React.Component {
  signUpHandler = async (signUp, event) => {
    event.preventDefault()

    const username = this.props.username.value
    const email = this.props.email.value
    const password = this.props.password.value
    const confirmPassword = this.props.confirmPassword.value

    // Show error message for required fields
    const requiredFields = { username, email, password, confirmPassword }
    for (let fieldName in requiredFields) {
      if (!requiredFields[fieldName]) {
        const setterMethodName = `set${upperFirst(fieldName)}`
        this.props[setterMethodName]({
          value: '',
          isValid: false,
          errMsg: `${startCase(fieldName)} is required`
        })
      }
    }
    if (!this.isValidFields()) return false

    await signUp({
      variables: {
        username,
        email,
        password,
        confirmPassword
      }
    })

    toast.success(`Account created`)

    this.props.setUsername({ value: '', isValid: true, errMsg: '' })
    this.props.setEmail({ value: '', isValid: true, errMsg: '' })
    this.props.setPassword({ value: '', isValid: true, errMsg: '' })
    this.props.setConfirmPassword({ value: '', isValid: true, errMsg: '' })
  }

  isValidFields = () => {
    if (
      this.props.username.value &&
      this.props.email.value &&
      this.props.password.value &&
      this.props.confirmPassword.value &&
      this.props.username.isValid &&
      this.props.email.isValid &&
      this.props.password.isValid &&
      this.props.confirmPassword.isValid
    ) {
      return true
    }
    return false
  }

  render() {
    return (
      <div className={commonClasses.FormWrapper}>
        <h2>Sign Up</h2>
        <ApolloConsumer>
          {client => (
            <Mutation
              mutation={SIGN_UP}
              onCompleted={data => {
                if (isEmpty(data.signUp)) return false
                localStorage.setItem('user', JSON.stringify(data.signUp))
                client.writeData({
                  data: { isSignedIn: !!localStorage.getItem('user') }
                })
              }}
            >
              {(signUp, { loading, error }) => {
                if (error) return error
                return (
                  <SignUpForm
                    signUpHandler={this.signUpHandler.bind(this, signUp)}
                  />
                )
              }}
            </Mutation>
          )}
        </ApolloConsumer>

        <div className={commonClasses.SwitchInfo}>
          <p>
            Already have account?{' '}
            <Button color="primary" onClick={this.props.toggleToSignIn}>
              Sign In
            </Button>
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  email: state.auth.email,
  password: state.auth.password,
  confirmPassword: state.auth.confirmPassword
})
const mapDispatchToProps = dispatch => {
  return {
    toggleToSignIn: () => dispatch(toggleToSignIn()),
    setUsername: username => dispatch(setUsername(username)),
    setEmail: email => dispatch(setEmail(email)),
    setPassword: password => dispatch(setPassword(password)),
    setConfirmPassword: confirmPassword =>
      dispatch(setConfirmPassword(confirmPassword))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
