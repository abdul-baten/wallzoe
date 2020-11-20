import React from 'react'

import _classes from './index.module.scss'

import Checkbox from '@material-ui/core/Checkbox';

class TodoAssignItem extends React.Component {
  render () {
    const { datetime, assignUsers, desc, isActive} = this.props
    return (
      <div className={_classes.assignItem}>
        <Checkbox
          checked={isActive}
          inputProps={{
            'aria-label': 'primary checkbox',
          }}
          color="primary"
        />
        <a href="/" className={_classes.assignDesc}>
          {desc}
        </a>
        <span className={_classes.assignDate}>
          {datetime}
        </span>
        {
          assignUsers.map(item => {
            return (
              <span key={item._id} className={_classes.assignUser}>
                {item.username}
              </span>
            )
          })
        }
      </div>
    )
  }
}

export default TodoAssignItem