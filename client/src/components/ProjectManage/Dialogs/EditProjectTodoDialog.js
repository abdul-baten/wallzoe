import React from 'react'

import { WallzoeTextField } from '../../InputFields/'
import WysiwygEditor from '../../WYSIWYG/index'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'; 

class EditProjectTodoDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      descModel: props.data.detail ? props.data.detail: ''
    }
  }

  handleModelChange = (model) => {
    this.setState({
      descModel: model
    });
  }

  render() {
    const {
      open,
      editTodo,
      onClose,
      onEditProjectTodoHandler,
      data,
      editProjectTodoName,
      onEditProjectTodoNameChangeHandler,
      onEditProjectTodoNameValidationHandler,
      onFillWithValueHandler
    } = this.props
    const { descModel } = this.state
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit To-do</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please update the to-do name and description.
          </DialogContentText>
          <WallzoeTextField
            onChangeHandler={onEditProjectTodoNameChangeHandler}
            onValidationHanlder={onEditProjectTodoNameValidationHandler}
            onFillWithValueHandler={onFillWithValueHandler}
            inputValue={editProjectTodoName}
            value={data.name}
          />
          <WysiwygEditor
            model={descModel}
            onModelChange={this.handleModelChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(event) => onEditProjectTodoHandler(editTodo, descModel, data._id, event)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default EditProjectTodoDialog;