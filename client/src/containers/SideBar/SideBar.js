import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Apps from '@material-ui/icons/Apps'

import { Logo } from '../../components/'

import { FAIcon } from '../../components/'
import { faTools } from '@fortawesome/free-solid-svg-icons'
import { HOME_URL, ADD_SOCIAL_ACCOUNT_URL } from '../../config'

import { appsMenuOpen, dialogOpen } from '../../store/actions'
import AppsMenu from '../AppsMenu/AppsMenu'
import SocialAccounts from '../SocialAccounts/SocialAccounts'

import classes from './SideBar.module.scss'

class SideBar extends React.Component {
  state = {
    sideBarTopHeight: null
  }

  appsButtonClickHandler = () => {
    this.props.dialogOpen()
    this.props.appsMenuOpen()
  }

  componentDidMount () {
    const logoWrapperElm = document.querySelector('.' + classes.LogoWrapper)
    const sidebarHeader = document.querySelector('.' + classes.SideBarHeader)
    if (!logoWrapperElm || !sidebarHeader) return
    const totalHeight =
      logoWrapperElm.clientHeight + sidebarHeader.clientHeight + 16
    // here 16 (8+8) is padding top & bottom of parent element
    this.setState({ sideBarTopHeight: totalHeight + 'px' })
  }
  render () {
    const appsButton = (
      <Button
        variant='outlined'
        color='primary'
        classes={{ root: classes.AppsButton }}
        onClick={this.appsButtonClickHandler}
      >
        <Apps />
      </Button>
    )
    const pageTitle = (
      <List component='div' disablePadding>
        <ListItem>
          <ListItemText
            classes={{ primary: classes.PageTitle }}
            primary='Social Media'
          />
          <ListItemSecondaryAction classes={{ root: classes.AddNewBtn }}>
            <Link
              to={ADD_SOCIAL_ACCOUNT_URL}
              style={{ color: '#333', display: 'block' }}
            >
              <Fab component='span' size='small'>
                <AddIcon />
              </Fab>
            </Link>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    )
    return (
      <div className={classes.SideBar}>
        <div className={classes.LogoWrapper}>
          <Link to={HOME_URL}>
            <Logo alt='Header Logo' />
          </Link>
          <div className={classes.ToolsBtn}>
            <button>
              <FAIcon icon={faTools} />
            </button>
          </div>
        </div>
        <div className={classes.SideBarHeader}>
          {appsButton}
          {pageTitle}
        </div>
        <SocialAccounts topSectionHeight={this.state.sideBarTopHeight} />
        <AppsMenu />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dialogOpen: () => dispatch(dialogOpen()),
    appsMenuOpen: () => dispatch(appsMenuOpen())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SideBar)
