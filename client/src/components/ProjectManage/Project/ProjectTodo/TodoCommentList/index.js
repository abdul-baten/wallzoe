import React from 'react'

import TodoCommentItem from '../TodoCommentItem'

class TodoCommentList extends React.Component {
  render() {
    const { data } = this.props
    return (
      data.map(item => (
        <TodoCommentItem
          key={item._id}
          data={item}
        />
      ))
    )
  }
}

export default TodoCommentList