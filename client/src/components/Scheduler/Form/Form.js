import React from 'react'
import { connect } from 'react-redux'

import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'

import { TextArea } from '../../InputFields/'
import { setScheduleTextContent } from '../../../store/actions'

import { DateTimePicker } from '../../../components'
import FileUploader from '../../../containers/FileUploader/FileUploader'

import classes from './Form.module.scss'

const form = props => {
  let selectedTime = 0
  const currentTime = new Date().getTime()
  if (props.scheduleAt.value) {
    selectedTime = props.scheduleAt.value
  }

  return (
    <form
      autoComplete='off'
      className={classes.AddEventForm}
      encType='multipart/form-data'
      onSubmit={props.submitHandler}
    >
      <DialogContent classes={{ root: classes.DialogContent }}>
        <TextArea
          classes={classes.TextArea}
          fieldObj={props.scheduleTextContent}
          fieldName='scheduleTextContent'
          setScheduleTextContent={props.setScheduleTextContent}
        />
        <FileUploader />
      </DialogContent>

      <DialogActions classes={{ root: classes.DialogActions }}>
        <DialogContentText>Publish on</DialogContentText>
        <DateTimePicker />

        <Button
          color='primary'
          variant='contained'
          disabled={!(selectedTime > currentTime)}
          type='submit'
        >
          Schedule
        </Button>
      </DialogActions>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    scheduleAt: state.scheduler.scheduleAt,
    scheduleTextContent: state.scheduler.scheduleTextContent
  }
}

const mapDispatchToProps = dispatch => ({
  setScheduleTextContent: textContent =>
    dispatch(setScheduleTextContent(textContent))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(form)
