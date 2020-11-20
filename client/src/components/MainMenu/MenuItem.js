import React from 'react'
import { NavLink } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'

import _classes from './MenuItem.module.scss'

class MenuItem extends React.Component {
  state = {
    SingleItemWidth: '',
    iconSize: '',
    fontSize: ''
  }
  componentDidMount () {
    const SingleItemElm = document.querySelector('.' + _classes.SingleItem)
    if (!SingleItemElm) return
    const SingleItemWidth = SingleItemElm.clientWidth
    this.setState({
      ...this.state,
      SingleItemWidth: SingleItemWidth + 'px',
      iconSize: Math.round(SingleItemWidth / 10) + 'px',
      fontSize: Math.round(SingleItemWidth / 18) + 'px'
    })
  }

  render () {
    const iconStyle = {
      fontSize: this.state.iconSize
    }
    const textStyle = {
      fontSize: this.state.fontSize
    }
    return (
      <Grid item xs={12} key={this.props.label}>
        <CardActionArea>
          <Card
            classes={{ root: _classes.SingleItem }}
          >
            <NavLink
              onClick={this.props.close}
              activeClassName="current" to={this.props.link}
            >
              <div
                className={_classes.Item}
                style={{ backgroundColor: this.props.backColor }}
              >
                <div className={_classes.Icon} style={iconStyle}>
                  {this.props.icon}
                </div>
                <div className={_classes.Text} style={textStyle}>
                  {this.props.label}
                </div>
              </div>
            </NavLink>
          </Card>
        </CardActionArea>
      </Grid>
    )
  }
}
export default MenuItem
