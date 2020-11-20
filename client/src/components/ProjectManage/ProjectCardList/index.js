import React from 'react'

import ProjectCardItem from '../ProjectCardItem'
import classes from './index.module.scss'

class ProjectCardList extends React.Component {
  render() {
    const { data } = this.props
    return (
      data.length === 0 ?
        <div className={classes.projectSlate}>
          <p className={`${classes.txtMedium} ${classes.txtSubtle}`}>
            Make a project for all the work you're keeping track of in Wazolle.Think
            "website redesign", "marketin campaign" or anything else you've got cooking
          </p>
        </div>
      : data.map(item => (
        <ProjectCardItem
          key={item._id}
          id={item._id}
          title={item.name}
          desc={item.desc}
        />
      ))
    )
  }
}

export default ProjectCardList