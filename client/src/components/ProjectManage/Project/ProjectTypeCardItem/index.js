import React from 'react'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'

import _classes from './index.module.scss'

import checkIcon from '../../../../media/check.svg'
import calendarIcon from '../../../../media/calendar.svg'
import documentIcon from '../../../../media/document.svg'

class ProjectTypeCardItem extends React.Component {
  render () {
    const currentPath = this.props.location.pathname
    return (
      <Grid item xs={4} key={this.props.id}>
        <CardActionArea>
          <Card
            classes={{ root: _classes.SingleItem }}
          >
            <Link
              to={`${currentPath}${this.props.link}`}
            >
              <div
                className={_classes.Item}
              >
                <header className={_classes.header}>
                  <h1 className={_classes.cardName}>
                    {this.props.name}
                  </h1>
                </header>
                <section className={_classes.body}>
                  <div className={_classes.cardIcon}>
                    {
                      this.props.id === 1 &&
                      <img src={checkIcon} className={_classes.cardIconSvg} alt='' />
                    }
                    {
                      this.props.id === 2 &&
                      <img src={calendarIcon} className={_classes.cardIconSvg} alt='' />
                    }
                    {
                      this.props.id === 3 &&
                      <img src={documentIcon} className={_classes.cardIconSvg} alt='' />
                    }
                  </div>
                  <div className={_classes.cardDesc}>
                    <p>
                      {this.props.desc}
                    </p>
                  </div>
                </section>
              </div>
            </Link>
          </Card>
        </CardActionArea>
      </Grid>
    )
  }
}
export default withRouter(ProjectTypeCardItem)
