import React from 'react'

import { FormControl, TextField, FormHelperText } from '@material-ui/core'

import classes from '../InputField.module.scss'

class WallzoeTextField extends React.Component {
  componentDidMount() {
    this.props.value && this.props.onFillWithValueHandler(this.props.value)
  }
  render() {
    const {
      onChangeHandler,
      onValidationHanlder,
      inputValue
    } = this.props
    return (
      <div className={classes.SingleFieldWrapper}>
        <FormControl fullWidth classes={{ root: classes.SingleField }}>
          <TextField
            autoFocus
            required
            value={inputValue.value}
            type="text"
            margin="dense"
            variant="outlined"
            onChange={onChangeHandler}
            onBlur={onValidationHanlder}
            error={!inputValue.isValid}
          />

          {inputValue.errMsg && (
            <FormHelperText
              classes={{ root: classes.errMsg }}
              error={!inputValue.isValid}
            >
              {inputValue.errMsg}
            </FormHelperText>
          )}
        </FormControl>
      </div>
    )
  }
}

export default WallzoeTextField