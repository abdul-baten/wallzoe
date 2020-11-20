import React from 'react'
import { connect } from 'react-redux'

import { TextField, FormControl, FormHelperText } from '@material-ui/core'

import { setUsernameOrEmail } from '../../../store/actions'
import { onChangeHandler, validationHandler } from '../../../inputField'

import classes from '../InputField.module.scss'

const usernameOrEmail = props => {
  return (
    <div className={classes.SingleFieldWrapper}>
      <FormControl fullWidth classes={{ root: classes.SingleField }}>
        <TextField
          required
          fullWidth
          label="Username or Email"
          value={props.usernameOrEmail.value}
          type="text"
          margin="dense"
          variant="outlined"
          onChange={onChangeHandler.bind(props, 'usernameOrEmail')}
          onBlur={validationHandler.bind(props, 'usernameOrEmail', true)}
          error={!props.usernameOrEmail.isValid}
        />

        {props.usernameOrEmail.errMsg && (
          <FormHelperText
            classes={{ root: classes.errMsg }}
            error={!props.usernameOrEmail.isValid}
          >
            {props.usernameOrEmail.errMsg}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  )
}

const mapStateToProps = state => ({
  usernameOrEmail: state.auth.usernameOrEmail
})

const mapDispatchToProps = dispatch => ({
  setUsernameOrEmail: usernameOrEmail =>
    dispatch(setUsernameOrEmail(usernameOrEmail))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(usernameOrEmail)
