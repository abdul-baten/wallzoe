import React from 'react'
import classes from './BurgIcon.module.scss'

export default ({ open, ...props }) => (
  <div className={classes.burgerMenuContainer}>
    <div className={open ? classes.burgerMenuOpen : classes.burgerMenu} {...props}>
      <div className={classes.bar1} key='b1' />
      <div className={classes.bar2} key='b2' />
      <div className={classes.bar3} key='b3' />
    </div>
  </div>
);
