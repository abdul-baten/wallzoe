import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import { isEmpty } from 'lodash'

import List from '@material-ui/core/List'

import { SOCIAL_ACCOUNTS } from '../../graphql'

import { AccountList } from '../../components'

import classes from './SocialAccounts.module.scss'

class SocialAccounts extends Component {
  render() {
    return (
      <List classes={{root: classes.AccountListWrapper}}>
        <div style={{ height: `calc(100vh - ${this.props.topSectionHeight})` }}>
          <Query query={SOCIAL_ACCOUNTS}>
            {({ data, loading, error }) => {
              if (error) return false
              if (isEmpty(data.socialAccounts)) return false
              return <AccountList accounts={data.socialAccounts} />
            }}
          </Query>
        </div>
      </List>
    )
  }
}

export default withRouter(SocialAccounts)
