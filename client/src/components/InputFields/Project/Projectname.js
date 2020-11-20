import React from 'react'
import { connect } from 'react-redux'

import { FormControl, TextField, FormHelperText } from '@material-ui/core'
import { onChangeHandler, validationHandler } from '../../../inputField'
import { setProjectName } from '../../../store/actions'
import classes from '../InputField.module.scss'

const projectname = props => {
  return (
    <div className={classes.SingleFieldWrapper}>
      <FormControl fullWidth classes={{ root: classes.SingleField }}>
        <TextField
          autoFocus
          required
          label="Projectname"
          value={props.projectName.value}
          type="text"
          margin="dense"
          variant="outlined"
          onChange={onChangeHandler.bind(props, 'projectName')}
          onBlur={validationHandler.bind(props, 'projectName', true)}
          error={!props.projectName.isValid}
        />

        {props.projectName.errMsg && (
          <FormHelperText
            classes={{ root: classes.errMsg }}
            error={!props.projectName.isValid}
          >
            {props.projectName.errMsg}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  )
}

const mapStateToProps = state => ({
  projectName: state.project.projectName
})

const mapDispatchToProps = dispatch => ({
  setProjectName: projectName => dispatch(setProjectName(projectName))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(projectname)
