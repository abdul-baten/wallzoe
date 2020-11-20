import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'

import {
  addPostDialogOpen,
  setScheduleAt,
  setScheduleTimezone
} from '../../store/actions'
import { AllEvents } from '../../components'
import { disabledPrevDate } from '../../helper'

const localizer = BigCalendar.momentLocalizer(moment)

class Scheduler extends React.Component {
  state = {
    AllEvents
  }

  componentDidMount = () => {
    // remove all day cell for events
    const allDayCell = document.querySelector('.rbc-allday-cell')
    if (allDayCell) allDayCell.remove()
    const singleButton = document.querySelectorAll('.rbc-btn-group button')
    if (singleButton) {
      // remove all day cell for events when click on Month, Week, Day, Agenda etc
      singleButton.forEach(elm => {
        elm.addEventListener('click', () => {
          const checkCell = setInterval(() => {
            if (allDayCell) {
              allDayCell.remove()
            } else {
              clearInterval(checkCell)
            }
          }, 500)
        })
      })
    }
  }

  handleSelect = ({ start, end }) => {
    if (disabledPrevDate(start)) return false

    if (this.props.isSelectedSMAccount !== true) {
      return false
    }
    this.props.setScheduleAt({
      value: moment(start),
      isValid: true,
      errMsg: ''
    })
    this.props.setScheduleTimezone({
      offset: -new Date(start).getTimezoneOffset(),
      isValid: true,
      errMsg: ''
    })
    this.props.addPostDialogOpen()
  }

  customDayPropGetter = date => {
    // disable previous day
    if (disabledPrevDate(date)) {
      return {
        className: 'disabledPrevDate'
      }
    } else {
      return {}
    }
  }

  render () {
    return (
      <BigCalendar
        selectable
        popup
        localizer={localizer}
        events={this.state.AllEvents}
        defaultView={BigCalendar.Views.MONTH}
        views={['month', 'week', 'day']}
        scrollToTime={new Date()}
        defaultDate={new Date()}
        onSelectEvent={event => console.log(event)}
        onSelectSlot={this.handleSelect}
        style={{ height: '100vh' }}
        step={1}
        timeslots={30}
        onSelecting={start => false}
        drilldownView=''
        endAccessor='start'
        dayPropGetter={this.customDayPropGetter}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    isSelectedSMAccount: state.scheduler.isSelectedSMAccount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPostDialogOpen: () => dispatch(addPostDialogOpen()),
    setScheduleAt: dateTime => dispatch(setScheduleAt(dateTime)),
    setScheduleTimezone: offset => dispatch(setScheduleTimezone(offset))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scheduler)
