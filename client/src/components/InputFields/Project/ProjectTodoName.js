import React from 'react'
import { connect } from 'react-redux'

import { FormControl, TextField, FormHelperText } from '@material-ui/core'
import { onChangeHandler, validationHandler } from '../../../inputField'
import { setProjectTodoName } from '../../../store/actions'
import classes from '../InputField.module.scss'

const ProjectTodoName = props => {
  return (
    <div className={classes.SingleFieldWrapper}>
      <FormControl fullWidth classes={{ root: classes.SingleField }}>
        <TextField
          autoFocus
          required
          label="ProjectTodoName"
          value={props.projectTodoName.value}
          type="text"
          margin="dense"
          variant="outlined"
          onChange={onChangeHandler.bind(props, 'projectTodoName')}
          onBlur={validationHandler.bind(props, 'projectTodoName', true)}
          error={!props.projectTodoName.isValid}
        />

        {props.projectTodoName.errMsg && (
          <FormHelperText
            classes={{ root: classes.errMsg }}
            error={!props.projectTodoName.isValid}
          >
            {props.projectTodoName.errMsg}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  )
}

const mapStateToProps = state => ({
  projectTodoName: state.project.projectTodoName
})

const mapDispatchToProps = dispatch => ({
  setProjectTodoName: projectTodoName => dispatch(setProjectTodoName(projectTodoName))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectTodoName)
