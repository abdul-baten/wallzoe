import React from 'react'
import ReactHtmlParser from 'react-html-parser'

import './index.scss'

class TodoCommentItem extends React.Component {
  render () {
    const { data } = this.props
    return (
      <div className='thread-entry'>
        <header className='thread-entry__header'>
          <span className='author-balloon author-balloon-mega'>M</span>
          <span className='thread-entry__author'>
            <strong>{ data.createdBy.username }</strong>
          </span>
          <span className='thread-entry__options'>
            <span className='thread-entry__time'>
              { new Date(parseInt(data.createdDate)).toLocaleString() }
            </span>
          </span>
        </header>
        { ReactHtmlParser(data.content) }
      </div>
    )
  }
}

export default TodoCommentItem