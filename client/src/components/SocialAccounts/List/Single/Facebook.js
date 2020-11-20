import React from 'react'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'

import classes from '../List.module.scss'

export default props => {
  const listTitle =
    props.name.length > 15 ? props.name.substr(0, 16) + '...' : props.name

  return (
    <ListItem
      key={props.id}
      button
      classes={{
        root: props.scheduleId.value === props.id ? classes.Active : ''
      }}
      onClick={props.selectHandler}
    >
      <div className={classes.ListAvatar}>
        <ListItemAvatar>
          <Avatar alt="F" src={props.pictureUrl} />
        </ListItemAvatar>
        {props.children}
      </div>
      <ListItemText primary={listTitle} secondary={props.subTitle} />
    </ListItem>
  )
}

