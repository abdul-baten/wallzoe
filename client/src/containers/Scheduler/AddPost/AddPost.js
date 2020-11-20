import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify'
import { capitalize } from 'lodash'
import { ApolloError } from 'apollo-client'

import { Dialog, DialogTitle, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { PhotoEditor } from '../../../containers'
import { ADD_POST } from '../../../graphql/gqls'

import {
  addPostDialogClose,
  setScheduleAt,
  dialogClose,
  dialogOpen,
  setScheduleTimezone,
  setScheduleTextContent,
  setScheduleFiles
} from '../../../store/actions/'

import { AddPostForm, SMIcon } from '../../../components'
import classes from './AddPost.module.scss'

class AddPost extends Component {
  submitHandler = async (addPost, event) => {
    event.preventDefault()

    if (this.isValidFields()) {
      const accountType = this.props.scheduleFor.value
      const accountId = this.props.scheduleId.value
      const accessToken = this.props.scheduleToken.value
      const scheduleAt =
        new Date(this.props.scheduleAt.value).getTime() / 1000 / 60
      const tzOffset = this.props.scheduleTimezone.offset
      const textContent = this.props.scheduleTextContent.value
      const files = this.props.scheduleFiles.value

      try {
        await addPost({
          variables: {
            accountType,
            accountId,
            accessToken,
            scheduleAt,
            tzOffset,
            textContent,
            files
          }
        })
        this.props.addPostDialogClose()
        toast.success(`Added ${capitalize(accountType)} post on scheduler`)

        // initialize some field with empty content
        this.props.setTextContent({
          value: '',
          isValid: true,
          errMsg: ''
        })
      } catch (err) {
        throw new ApolloError(err)
      }
    }
  }
  dialogCloseHandler = () => {
    this.props.addPostDialogClose()
    this.props.setScheduleFiles({ value: [], isValid: true, errMsg: '' })
  }

  isValidFields = () => {
    const validationData = [
      this.props.scheduleFor.value,
      this.props.scheduleFor.isValid,
      this.props.scheduleId.value,
      this.props.scheduleId.isValid,
      this.props.scheduleToken.value,
      this.props.scheduleToken.isValid,
      this.props.scheduleAt.value,
      this.props.scheduleAt.isValid,
      this.props.scheduleTimezone.offset,
      this.props.scheduleTimezone.isValid,
      this.props.scheduleTextContent.isValid,
      this.props.scheduleFiles.isValid
    ]
    const isNotValid = validationData.some(data => !data)
    if (isNotValid) return false
    return true
  }
  renderPhotoEditor = () => {
    const addPostDialogElm = document.querySelector(`.${classes.AddPostDialog}`)
    if (this.props.isPhotoEditorOpen) {
      if (addPostDialogElm) addPostDialogElm.style.display = 'none'
      return <PhotoEditor />
    } else {
      if (addPostDialogElm) addPostDialogElm.style.display = 'block'
    }
  }

  render() {
    return (
      <>
        <Dialog
          fullWidth
          maxWidth="sm"
          scroll="body"
          open={this.props.isAddPostDialogOpen}
          onEnter={this.props.dialogOpen}
          onClose={this.dialogCloseHandler}
          onExited={this.props.dialogClose}
          aria-labelledby="form-dialog-title"
          classes={{
            root: classes.AddPostDialog
          }}
        >
          <SMIcon
            size="medium"
            type={this.props.scheduleFor.value}
            left="6px"
            top="6px"
          />

          <IconButton
            size="small"
            classes={{ root: classes.CloseBtn }}
            onClick={this.dialogCloseHandler}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <DialogTitle classes={{ root: classes.DialogTitle }}>
            Schedule your post
          </DialogTitle>
          <Mutation mutation={ADD_POST}>
            {(addPost, { loading, error }) => {
              return (
                <AddPostForm
                  submitHandler={this.submitHandler.bind(this, addPost)}
                />
              )
            }}
          </Mutation>
        </Dialog>
        {this.renderPhotoEditor()}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    isPhotoEditorOpen: state.photoEditor.isPhotoEditorOpen,
    isAddPostDialogOpen: state.scheduler.isAddPostDialogOpen,
    scheduleFor: state.scheduler.scheduleFor,
    scheduleId: state.scheduler.scheduleId,
    scheduleToken: state.scheduler.scheduleToken,
    scheduleAt: state.scheduler.scheduleAt,
    scheduleTimezone: state.scheduler.scheduleTimezone,
    scheduleTextContent: state.scheduler.scheduleTextContent,
    scheduleFiles: state.scheduler.scheduleFiles
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPostDialogClose: () => dispatch(addPostDialogClose()),
    dialogOpen: () => dispatch(dialogOpen()),
    dialogClose: () => dispatch(dialogClose()),
    setScheduleAt: dateTime => dispatch(setScheduleAt(dateTime)),
    setScheduleTimezone: offset => dispatch(setScheduleTimezone(offset)),
    setTextContent: value => dispatch(setScheduleTextContent(value)),
    setScheduleFiles: files => dispatch(setScheduleFiles(files))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPost)
