import React from 'react'

import TodoAssignItem from '../TodoAssignItem'

class TodoAssignList extends React.Component {
  render() {
    const { data } = this.props
    return (
      data.map(item => (
        <TodoAssignItem
          key={item._id}
          datetime={item.datetime}
          desc={item.desc}
          assignUsers={item.assignUsers}
          isActive={item.isActive}
        />
      ))
    )
  }
}

export default TodoAssignList