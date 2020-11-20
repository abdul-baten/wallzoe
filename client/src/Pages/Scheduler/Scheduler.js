import React from 'react'
import { connect } from 'react-redux'

import { AddPost, Scheduler as SchedulerContainer } from '../../containers'

import './react-big-calendar.css'
import './Scheduler.scss'

const propTypes = {}

class Scheduler extends React.Component {
  render() {
    return (
      <div id='wallzoeScheduler'>
        <div
          className='preventSelectOverlay'
          style={{
            display: !this.props.isSelectedSMAccount ? 'block' : 'none'
          }}
        >
          <h2>Please select a Social Media Item from left</h2>
        </div>
        <SchedulerContainer />
        <AddPost />
      </div>
    )
  }
}

Scheduler.propTypes = propTypes

const mapStateToProps = state => {
  return {
    isSelectedSMAccount: state.scheduler.isSelectedSMAccount
  }
}

export default connect(mapStateToProps)(Scheduler)
