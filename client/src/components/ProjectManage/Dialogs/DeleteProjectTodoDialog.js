import React from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'; 

class DeleteProjectTodoDialog extends React.Component {
  render() {
    const {
      open,
      deleteTodo,
      onClose,
      onDeleteProjectTodoHandler,
      data
    } = this.props
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Archive or delete this project?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Archive it if it's paused, done, or canceled - it'll be kept safely for your records, but no longer shown on the Home screen.Put it in the trash if you want it gone for good.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(event) => onDeleteProjectTodoHandler(deleteTodo, data._id, false, event)} color="primary">
            Archive the project
          </Button>
          <Button onClick={(event) => onDeleteProjectTodoHandler(deleteTodo, data._id, true, event)} color="primary">
            Put it in the trash
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default DeleteProjectTodoDialog;