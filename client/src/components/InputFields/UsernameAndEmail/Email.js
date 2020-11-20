import React from 'react'
import { connect } from 'react-redux'

import { FormControl, TextField, FormHelperText } from '@material-ui/core'

import { onChangeHandler, validationHandler } from '../../../inputField'
import { setEmail } from '../../../store/actions'

import classes from '../InputField.module.scss'

const email = props => {
  return (
    <div className={classes.SingleFieldWrapper}>
      <FormControl fullWidth classes={{ root: classes.SingleField }}>
        <TextField
          required
          value={props.email.value}
          label="Email Address"
          type="email"
          margin="dense"
          variant="outlined"
          onChange={onChangeHandler.bind(props, 'email')}
          onBlur={validationHandler.bind(props, 'email', true)}
          error={!props.email.isValid}
        />

        {props.email.errMsg && (
          <FormHelperText
            classes={{ root: classes.errMsg }}
            error={!props.email.isValid}
          >
            {props.email.errMsg}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  )
}

const mapStateToProps = state => ({
  email: state.auth.email
})

const mapDispatchToProps = dispatch => ({
  setEmail: email => dispatch(setEmail(email))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(email)
