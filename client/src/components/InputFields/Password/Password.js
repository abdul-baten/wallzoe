import React from 'react'
import { connect } from 'react-redux'

import { FormControl, TextField, FormHelperText } from '@material-ui/core'
import { onChangeHandler, validationHandler } from '../../../inputField'
import { setPassword } from '../../../store/actions'
import classes from '../InputField.module.scss'

const password = props => {
  let errMsg = props.password.errMsg
  if (errMsg) {
    if (Array.isArray(errMsg)) {
      errMsg = (
        <ul>
          <p>Password must contains :</p>
          {errMsg.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      )
    } else {
      errMsg = <p>{errMsg}</p>
    }
  }
  return (
    <div className={classes.SingleFieldWrapper}>
      <FormControl fullWidth classes={{ root: classes.SingleField }}>
        <TextField
          required
          value={props.password.value}
          label="Password"
          type="password"
          margin="dense"
          variant="outlined"
          onChange={onChangeHandler.bind(props, 'password')}
          onBlur={validationHandler.bind(props, 'password', true)}
          error={!props.password.isValid}
        />

        {errMsg && (
          <FormHelperText
            component="div"
            error={!props.password.isValid}
            classes={{ root: classes.errMsg }}
          >
            {errMsg}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  )
}

const mapStateToProps = state => ({
  password: state.auth.password
})
const mapDispatchToProps = dispatch => ({
  setPassword: password => dispatch(setPassword(password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(password)
