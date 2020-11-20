import React from 'react'

import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import AddEventDialog from './Event/AddEventDialog'
import allEvents from './Event/all'
import dateEnabled from '../../../../utils/dateEnabled'

import './index.scss'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = BigCalendar.momentLocalizer(moment)

class ProjectSchedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allEvents,
      openDialog: false
    }
  }

  handleSelect = ({ start, end }) => {
    if (!dateEnabled(start)) return
    this.setState({
      openDialog: true
    })
  }

  handleClose = () => {
    this.setState({
      openDialog: false
    })
  }

  customDayPropGetter = date => {
    // disable previous day

    if (!dateEnabled(date)) {
      return {
        className: 'disabledPrevDate'
      }
    } else {
      return {}
    }
  }

  render () {
    const { openDialog } = this.state
    const pathArray = this.props.location.pathname.split('/')
    const projectPath = '/' + pathArray[1] + '/' + pathArray[2]
    return (
      <React.Fragment>
        <div className="panelBreadCrumb">
          <Link to='/projects'>
            <div className="breadCrumbItem">
              <span className="breadCrumbName">
                <span>Projects</span>
              </span>
            </div>
          </Link>
          <Link to={projectPath}>
            <div className="breadCrumbItem">
              <span className="breadCrumbName">
                <span>Example</span>
              </span>
            </div>
          </Link>
        </div>
        <div className="panelTodo">
          <header className="header">
            <h1 className="title">
              <span>Schedules</span>
            </h1>
          </header>
          <div id="projectScheduler">
            <BigCalendar
              selectable
              popup
              localizer={localizer}
              events={this.state.allEvents}
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
            <AddEventDialog
              open={openDialog}
              handleClose={this.handleClose}
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(ProjectSchedule)