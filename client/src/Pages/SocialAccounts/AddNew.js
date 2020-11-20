import React from 'react'

import Grid from '@material-ui/core/Grid'

import { AccountTiles } from '../../components/'

const addNew = () => {
  return (
    <section>
      <Grid container justify='center'>
        <Grid item xs={8}>
          <Grid container spacing={32}>
            <AccountTiles />
          </Grid>
        </Grid>
      </Grid>
    </section>
  )
}

export default addNew
