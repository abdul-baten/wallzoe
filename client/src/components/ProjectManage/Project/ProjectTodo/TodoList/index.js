import React from 'react'

import TodoItem from '../TodoItem'

class TodoList extends React.Component {
  render() {
    const { data, users, addTodoAssignHandler } = this.props
    return (
      data.map(item => (
        <TodoItem
          key={item._id}
          id={item._id}
          title={item.name}
          desc={item.detail}
          assign={item.assign ? item.assign : []}
          users={users}
          addTodoAssignHandler={addTodoAssignHandler}
        />
      ))
    )
  }
}

export default TodoList