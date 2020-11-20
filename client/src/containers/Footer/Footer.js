import React, { Component } from 'react'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'

import classes from './Footer.module.scss'
import { Address, Copyright, MenuItems } from '../../components'

class Footer extends Component {
  render () {
    const paddingForDialog = this.props.isDialogOpen ? '15px' : '0'
    return (
      <footer
        className={classes.Footer}
        id='WallzoeFooter'
        style={{ paddingRight: paddingForDialog }}
      >
        <div className={classes.FooterWrapper}>
          <Grid container>
            <Grid item sm={6} xs={12}>
              <Copyright />
            </Grid>
            <Grid item sm={3} xs={12}>
              <MenuItems />
            </Grid>
            <Grid item sm={3} xs={12}>
              <Address />
            </Grid>
          </Grid>
        </div>
      </footer>
    )
  }
}

const mapStateToProps = state => {
  return {
    isDialogOpen: state.general.isDialogOpen
  }
}
export default connect(mapStateToProps)(Footer)
