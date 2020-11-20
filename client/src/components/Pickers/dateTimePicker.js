import React from 'react'
import { connect } from 'react-redux'

import {
  MuiPickersUtilsProvider,
  InlineDateTimePicker
} from 'material-ui-pickers'
import { setScheduleAt} from '../../store/actions'

import MomentUtils from '@date-io/moment'

const dateTimePicker = props => {
  const onChangeHandler = dateTime => {
    props.setScheduleAt({
      value: dateTime,
      isValid: true,
      errMsg: ''
    })
  }
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <InlineDateTimePicker
        keyboard
        value={props.scheduleAt.value}
        onChange={dateTime => onChangeHandler(dateTime)}
      />
    </MuiPickersUtilsProvider>
  )
}

const mapStateToProps = state => {
  return {
    scheduleAt: state.scheduler.scheduleAt
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setScheduleAt: dateTime => dispatch(setScheduleAt(dateTime))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(dateTimePicker)
