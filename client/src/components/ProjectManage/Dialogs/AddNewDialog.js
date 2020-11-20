import React from 'react'

import {
  WallzoeTextField
} from '../../InputFields/'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'; 

class AddNewDialog extends React.Component {
  render() {
    const {
      open,
      addProject,
      onClose,
      addProjectName,
      onNewProjectHandler,
      onAddProjectNameChangeHandler,
      onAddProjectNameValidationHandler
    } = this.props
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create the new project, please enter the name of project here.
          </DialogContentText>
          <WallzoeTextField
            onChangeHandler={onAddProjectNameChangeHandler}
            onValidationHanlder={onAddProjectNameValidationHandler}
            inputValue={addProjectName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(event) => onNewProjectHandler(addProject, event)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default AddNewDialog;