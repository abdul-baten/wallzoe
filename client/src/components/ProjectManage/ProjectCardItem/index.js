import React from 'react'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'

import _classes from './index.module.scss'

class ProjectCardItem extends React.Component {
  state = {
    SingleItemWidth: '',
    titleFontSize: '',
    descFontSize: '',
  }
  componentDidMount () {
    const SingleItemElm = document.querySelector('.' + _classes.SingleItem)
    if (!SingleItemElm) return
    const SingleItemWidth = SingleItemElm.clientWidth
    this.setState({
      ...this.state,
      SingleItemWidth: SingleItemWidth + 'px',
      titleFontSize: Math.round(SingleItemWidth / 13) + 'px',
      descFontSize: Math.round(SingleItemWidth / 16) + 'px'
    })
  }

  render () {
    const textTitleStyle = {
      fontSize: this.state.titleFontSize,
      fontWeight: 600
    }
    const textDescStyle = {
      fontSize: this.state.descFontSize
    }
    return (
      <Grid item xs={4} key={this.props.title}>
        <CardActionArea>
          <Card
            classes={{ root: _classes.SingleItem }}
          >
            <Link
              onClick={this.props.close}
              to={`projects/${this.props.id}`}
            >
              <div
                className={_classes.Item}
              >
                <div className={_classes.Text} style={textTitleStyle}>
                  {this.props.title}
                </div>
                <div className={_classes.Text} style={textDescStyle}>
                  {this.props.desc}
                </div>
              </div>
            </Link>
          </Card>
        </CardActionArea>
      </Grid>
    )
  }
}
export default ProjectCardItem
