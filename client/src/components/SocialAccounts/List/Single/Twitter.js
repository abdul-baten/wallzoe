import React from 'react'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'

import classes from '../List.module.scss'

export default props => {
  const listTitle =
    props.userName.length > 15
      ? props.userName.substr(0, 16) + '...'
      : props.userName
  return (
    <ListItem
      button
      onClick={props.selectHandler}
      classes={{
        root: props.scheduleId.value === props.accountId ? classes.Active : ''
      }}
    >
      <div className={classes.ListAvatar}>
        <ListItemAvatar>
          <Avatar alt="I" src={props.pictureUrl} />
        </ListItemAvatar>
        {props.children}
      </div>
      <ListItemText primary={listTitle} secondary={props.subTitle} />
    </ListItem>
  )
}
