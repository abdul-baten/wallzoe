import React from 'react'
import { kebabCase } from 'lodash'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'

import { setAuthFor } from '../../../../graphql/queries/'
import classes from './Tile.module.scss'

class AccountTile extends React.Component {
  state = {
    SingleItemWidth: '',
    iconSize: '',
    fontSize: ''
  }
  componentDidMount () {
    const SingleItemElm = document.querySelector('.' + classes.SingleItem)
    if (!SingleItemElm) return
    const SingleItemWidth = SingleItemElm.clientWidth
    this.setState({
      ...this.state,
      SingleItemWidth: SingleItemWidth + 'px',
      iconSize: Math.round(SingleItemWidth / 2) + 'px',
      fontSize: Math.round(SingleItemWidth / 10) + 'px'
    })
  }

  onClickHandler = async () => {
    // setAuthFor -> store temporary data to check which social media account trying to authenticate
    if (await setAuthFor(kebabCase(this.props.label))) {
      window.location = this.props.link
    }
  }

  render () {
    const cardStyle = {
      height: this.state.SingleItemWidth
    }
    const iconStyle = {
      fontSize: this.state.iconSize
    }
    const textStyle = {
      fontSize: this.state.fontSize
    }
    return (
      <Grid item sm={4}>
        <CardActionArea>
          <Card
            classes={{ root: classes.SingleItem }}
            onClick={this.onClickHandler}
          >
            <div
              style={{ ...cardStyle, backgroundColor: this.props.backColor }}
            >
              <div className={classes.Icon} style={iconStyle}>
                {this.props.icon}
              </div>
              <div className={classes.Text} style={textStyle}>
                {this.props.label}
              </div>
            </div>
          </Card>
        </CardActionArea>
      </Grid>
    )
  }
}
export default AccountTile
