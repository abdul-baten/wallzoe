import React from 'react'

import Grid from '@material-ui/core/Grid'

import MenuList from './MenuList'
import Logo from '../Logo/Logo'

import classes from './MainMenu.module.scss'

export default ({ close }) => (
  <section>
    <div className={classes.menuLogo}>
      <Logo />
    </div>
    <Grid container justify='center'>
      <Grid item xs={5}>
        <Grid container spacing={32}>
          <MenuList
            close={close}
          />
        </Grid>
      </Grid>
    </Grid>
  </section>
)
