import React from 'react'
import { connect } from 'react-redux'

import { FormControl, TextField, FormHelperText } from '@material-ui/core'
import { onChangeHandler, validationHandler } from '../../../inputField'
import { setUsername } from '../../../store/actions'
import classes from '../InputField.module.scss'

const username = props => {
  return (
    <div className={classes.SingleFieldWrapper}>
      <FormControl fullWidth classes={{ root: classes.SingleField }}>
        <TextField
          autoFocus
          required
          label="Username"
          value={props.username.value}
          type="text"
          margin="dense"
          variant="outlined"
          onChange={onChangeHandler.bind(props, 'username')}
          onBlur={validationHandler.bind(props, 'username', true)}
          error={!props.username.isValid}
        />

        {props.username.errMsg && (
          <FormHelperText
            classes={{ root: classes.errMsg }}
            error={!props.username.isValid}
          >
            {props.username.errMsg}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  )
}

const mapStateToProps = state => ({
  username: state.auth.username
})

const mapDispatchToProps = dispatch => ({
  setUsername: username => dispatch(setUsername(username))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(username)
