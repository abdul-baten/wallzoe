import React from 'react'
import { startCase, upperFirst } from 'lodash'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ApolloConsumer, Mutation } from 'react-apollo'
import Button from '@material-ui/core/Button'
import { toast } from 'react-toastify'

import { toggleToSignUp } from '../../../store/actions'
import { SIGN_IN } from '../../../graphql'
import { SignInForm } from '../../../components'
import { setUsernameOrEmail, setSignInPassword } from '../../../store/actions'

import commonClasses from '../Auth.module.scss'

class SignIn extends React.Component {
  signInHandler = async (signIn, event) => {
    event.preventDefault()

    const usernameOrEmail = this.props.usernameOrEmail.value
    const signInPassword = this.props.signInPassword.value

    // Show error message fro required fields
    const requiredFields = { usernameOrEmail, signInPassword }
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

    await signIn({
      variables: {
        usernameOrEmail,
        password: signInPassword
      }
    })
  }

  isValidFields = () => {
    if (
      this.props.usernameOrEmail.value &&
      this.props.signInPassword.value &&
      this.props.usernameOrEmail.isValid &&
      this.props.signInPassword.isValid
    ) {
      return true
    }
    return false
  }

  render() {
    return (
      <div className={commonClasses.FormWrapper}>
        <h2>Log In</h2>
        <ApolloConsumer>
          {client => (
            <Mutation
              mutation={SIGN_IN}
              onCompleted={data => {
                if (!data.signIn) {
                  toast.error(`Credential is not valid`)
                } else {
                  localStorage.setItem('user', JSON.stringify(data.signIn))
                  client.writeData({
                    data: { isSignedIn: !!localStorage.getItem('user') }
                  })
                  toast.success(`Sign in successful`)
                }
              }}
            >
              {(signIn, { loading, error }) => {
                return (
                  <SignInForm
                    signInHandler={this.signInHandler.bind(this, signIn)}
                  />
                )
              }}
            </Mutation>
          )}
        </ApolloConsumer>
        <div className={commonClasses.SwitchInfo}>
          <p>
            Need Account?{' '}
            <Button color="primary" onClick={this.props.toggleToSignUp}>
              Create an Account
            </Button>
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    usernameOrEmail: state.auth.usernameOrEmail,
    signInPassword: state.auth.signInPassword
  }
}
const mapDispatchToProps = dispatch => {
  return {
    toggleToSignUp: () => dispatch(toggleToSignUp()),
    setUsernameOrEmail: usernameOrEmail =>
      dispatch(setUsernameOrEmail(usernameOrEmail)),
    setSignInPassword: signInPassword =>
      dispatch(setSignInPassword(signInPassword))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignIn))
