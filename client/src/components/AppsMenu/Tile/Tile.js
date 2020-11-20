import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'

import { appsMenuClose } from '../../../store/actions'
import classes from './Tile.module.scss'

class Tile extends React.Component {
  state = {
    SingleItemWidth: '',
    iconSize: '',
    fontSize: ''
  }
  componentDidMount() {
    const SingleItemElm = document.querySelector('.' + classes.SingleItem)
    if (!SingleItemElm) return
    const SingleItemWidth = SingleItemElm.clientWidth
    this.setState({
      ...this.state,
      SingleItemWidth: SingleItemWidth + 'px',
      iconSize: Math.round(SingleItemWidth / 2) + 'px',
      fontSize: Math.round(SingleItemWidth / 8) + 'px'
    })
  }

  onClickHandler = () => {
    this.props.appsMenuClose()
    this.props.history.push(this.props.link)
  }

  render() {
    return (
      <React.Fragment>
        {this.props.label === 'Social Media' && <Grid item sm={3} />}
        <Grid item sm={6} xs={12}>
          <CardActionArea>
            <Card
              classes={{ root: classes.SingleItem }}
              style={{ borderColor: this.props.borderColor }}
              onClick={this.onClickHandler}
            >
              <div>
                <div className={classes.Icon}>{this.props.icon}</div>
                <div className={classes.Text}>{this.props.label}</div>
              </div>
            </Card>
          </CardActionArea>
        </Grid>
        {this.props.label === 'Social Media' && <Grid item sm={3} />}
      </React.Fragment>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  appsMenuClose: () => dispatch(appsMenuClose())
})
export default connect(
  null,
  mapDispatchToProps
)(withRouter(Tile))
