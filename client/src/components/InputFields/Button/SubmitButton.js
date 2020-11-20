import React from 'react'

import { Button, FormControl } from '@material-ui/core'

import classes from '../InputField.module.scss'

const button = props => {
  return (
    <div className={classes.SingleFieldWrapper}>
      <FormControl fullWidth classes={{ root: classes.SingleField }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.SubmitBtn}
          type="submit"
        >
          {props.label}
        </Button>
      </FormControl>
    </div>
  )
}
export default button
