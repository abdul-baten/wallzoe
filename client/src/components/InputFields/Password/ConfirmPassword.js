import React from 'react'
import { connect } from 'react-redux'

import { FormControl, TextField, FormHelperText } from '@material-ui/core'
import { onChangeHandler, validationHandler } from '../../../inputField'
import { setConfirmPassword } from '../../../store/actions'
import classes from '../InputField.module.scss'

// confirmation password field
const confirmPassword = props => {
  return (
    <div className={classes.SingleFieldWrapper}>
      <FormControl fullWidth classes={{ root: classes.SingleField }}>
        <TextField
          required
          value={props.confirmPassword.value}
          label="Confirm Password"
          type="password"
          margin="dense"
          variant="outlined"
          onChange={onChangeHandler.bind(props, 'confirmPassword')}
          onBlur={validationHandler.bind(
            props,
            'confirmPassword',
            true,
            props.password.value
          )}
          error={!props.confirmPassword.isValid}
        />

        {props.confirmPassword.errMsg && (
          <FormHelperText
            classes={{ root: classes.errMsg }}
            error={!props.confirmPassword.isValid}
          >
            {props.confirmPassword.errMsg}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  )
}

const mapStateToProps = state => ({
  confirmPassword: state.auth.confirmPassword,
  password: state.auth.password
})

const mapDispatchToProps = dispatch => ({
  setConfirmPassword: confirmPassword =>
    dispatch(setConfirmPassword(confirmPassword))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(confirmPassword)
