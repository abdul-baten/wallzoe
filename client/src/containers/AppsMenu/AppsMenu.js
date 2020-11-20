import React from 'react'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/Icon'
import CloseIcon from '@material-ui/icons/Close'

import { appsMenuClose, dialogClose } from '../../store/actions'
import { AppsMenuTiles } from '../../components/'

import classes from './AppsMenu.module.scss'

class AppsMenu extends React.Component {
  render() {
    return (
      <Dialog
        fullScreen
        open={this.props.isAppsMenuOpen}
        onExited={this.props.dialogClose}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={this.props.appsMenuClose}
          aria-label="Close"
          classes={{ root: classes.CloseBtn }}
        >
          <CloseIcon />
        </IconButton>

        <section>
          <Grid
            container
            justify="center"
            alignItems="center"
            classes={{ container: classes.AppsMenuContainer }}
          >
            <Grid item xs={6}>
              <Grid container spacing={32}>
                <AppsMenuTiles
                  onMenuDialogClose={this.props.appsMenuClose}
                />
              </Grid>
            </Grid>
          </Grid>
        </section>
      </Dialog>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAppsMenuOpen: state.general.isAppsMenuOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dialogClose: () => dispatch(dialogClose()),
    appsMenuClose: () => dispatch(appsMenuClose())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppsMenu)
