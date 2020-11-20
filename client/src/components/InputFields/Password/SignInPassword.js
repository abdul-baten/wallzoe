import React from 'react'
import { connect } from 'react-redux'

import { TextField, FormControl, FormHelperText } from '@material-ui/core'

import { setSignInPassword } from '../../../store/actions'
import { onChangeHandler, validationHandler } from '../../../inputField'

import classes from '../InputField.module.scss'

// Password field for sign in
const signInPassword = props => {
  return (
    <div className={classes.SingleFieldWrapper}>
      <FormControl fullWidth classes={{ root: classes.SingleField }}>
        <TextField
          required
          value={props.signInPassword.value}
          label="Password"
          type="password"
          margin="dense"
          variant="outlined"
          onChange={onChangeHandler.bind(props, 'signInPassword')}
          onBlur={validationHandler.bind(props, 'signInPassword', true)}
          error={!props.signInPassword.isValid}
        />
        {props.signInPassword.errMsg && (
          <FormHelperText
            component="div"
            error={!props.signInPassword.isValid}
            classes={{ root: classes.errMsg }}
          >
            {props.signInPassword.errMsg}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  )
}

const mapStateToProps = state => ({
  signInPassword: state.auth.signInPassword
})
const mapDispatchToProps = dispatch => ({
  setSignInPassword: signInPassword => dispatch(setSignInPassword(signInPassword))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(signInPassword)
