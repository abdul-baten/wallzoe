import React from 'react'

import { FormControl, TextField, FormHelperText } from '@material-ui/core'
import { onChangeHandler } from '../../../inputField'
import classes from '../InputField.module.scss'

const textArea = props => {
  return (
    <div className={classes.SingleFieldWrapper}>
      <FormControl fullWidth classes={{ root: classes.SingleField }}>
        <TextField
          autoFocus
          fullWidth
          multiline
          label='Write here...'
          value={props.fieldObj.value}
          type='text'
          margin='normal'
          rows='7'
          rowsMax='155'
          variant='outlined'
          className={props.classes}
          onChange={onChangeHandler.bind(props, props.fieldName)}
          /* onBlur={validationHandler.bind(props, 'fieldObj', true)}
          error={!props.fieldObj.isValid} */
        />

        {props.fieldObj.errMsg && (
          <FormHelperText
            classes={{ root: classes.errMsg }}
            error={!props.fieldObj.isValid}
          >
            {props.fieldObj.errMsg}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  )
}

export default textArea
