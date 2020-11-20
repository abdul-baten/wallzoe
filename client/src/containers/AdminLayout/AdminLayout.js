import React from 'react'
import _ from 'lodash'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'

import { Query } from 'react-apollo'

import { cache, IS_SIGNED_IN } from '../../graphql'
import { Auth } from '../../Pages/'
import SideBar from '../SideBar/SideBar'
import AppBar from '../AppBar/AppBar'
import Footer from '../Footer/Footer'
import {
  HOME_URL,
  ADD_SOCIAL_ACCOUNT_URL,
  SCHEDULER_URL,
  PHOTO_EDITOR_URL,
  PROJECT_MANAGE,
  PROJECT_MANAGE_SLUG,
  PROJECT_TODO_SLUG,
  PROJECT_SCHEDULE_SLUG,
  PROJECT_TODO_DETAIL_URL
} from '../../config'
import lazyLoad from '../../HOC/lazyLoad'

import PhotoEditor from '../PhotoEditor/PhotoEditor'

import classes from './AdminLayout.module.scss'

// lazy load components
const AddNewSocialAccount = lazyLoad(() => {
  return import('../../Pages/SocialAccounts/AddNew')
})
const Scheduler = lazyLoad(() => {
  return import('../../Pages/Scheduler/Scheduler')
})

cache.writeData({
  data: {
    isSignedIn: !!localStorage.getItem('user')
  }
})
const ProjectManager = lazyLoad(() => {
  return import('../ProjectManage/ProjectManage')
})
const Project = lazyLoad(() => {
  return import('../ProjectManage/Project')
})
const ProjectTodo = lazyLoad(() => {
  return import('../ProjectManage/Project/ProjectTodo')
})
const ProjectSchedule = lazyLoad(() => {
  return import('../ProjectManage/Project/ProjectSchedule')
})
const ProjectTodoDetail = lazyLoad(() => {
  return import('../ProjectManage/Project/ProjectTodo/detail')
})

class AdminLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      footerHeight: ''
    }
  }
  componentDidMount = () => {
    if (!this.state.footerHeight) {
      const footerElm = document.getElementById('WallzoeFooter')
      if (footerElm) {
        this.setState({
          ...this.state,
          footerHeight: footerElm.clientHeight + 'px'
        })
      }
    }

    if (
      this.props.location.pathname === '/' &&
      this.props.location.hash === '#_=_'
    ) {
      this.props.location.hash = ''
      this.props.history.push('', document.title, this.props.location.pathname)
    }
  }

  componentDidUpdate = prevProps => {
    this.props.history.listen((location, action) => {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    })
  }

  render () {
    const style = {
      marginBottom: this.state.footerHeight
    }
    const authPage = <Auth />
    const adminPage = (
      <div className='WallzoeApp' style={style}>
        <SideBar />
        <AppBar />
        <section className={classes.MainContent}>
          <Switch>
            <Route
              exact
              path={HOME_URL}
              render={() => <Redirect to={SCHEDULER_URL} />}
            />
            <Route path={SCHEDULER_URL} component={Scheduler} />
            <Route
              path={ADD_SOCIAL_ACCOUNT_URL}
              component={AddNewSocialAccount}
            />
            <Route
              exact
              path={PROJECT_MANAGE}
              component={ProjectManager}
            />
            <Route
              exact
              path={PROJECT_MANAGE_SLUG}
              component={Project}
            />
            <Route
              exact
              path={PROJECT_TODO_SLUG}
              component={ProjectTodo}
            />
            <Route
              exact
              path={PROJECT_SCHEDULE_SLUG}
              component={ProjectSchedule}
            />
            <Route path={PHOTO_EDITOR_URL} component={PhotoEditor} />
            <Route
              exact
              path={PROJECT_TODO_DETAIL_URL}
              component={ProjectTodoDetail}
            />
          </Switch>
        </section>
        <Footer copyRightText='Copyright' />
      </div>
    )

    return (
      <React.Fragment>
        <Query query={IS_SIGNED_IN}>
          {({ data, loading, error }) => {
            if (error) return false
            if (!_.isEmpty(data) && data.isSignedIn) {
              return adminPage
            } else {
              return authPage
            }
          }}
        </Query>
      </React.Fragment>
    )
  }
}

export default withRouter(AdminLayout)
