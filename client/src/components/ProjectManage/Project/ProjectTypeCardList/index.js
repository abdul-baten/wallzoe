import React from 'react'

import ProjectTypeCardItem from '../ProjectTypeCardItem'

class ProjectTypeCardList extends React.Component {
  render() {
    const { data } = this.props
    return (
      data.map(item => (
        <ProjectTypeCardItem
          key={item.id}
          id={item.id}
          name={item.name}
          desc={item.desc}
          link={item.link}
        />
      ))
    )
  }
}

export default ProjectTypeCardList