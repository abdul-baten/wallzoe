import React from 'react'
import { ApolloConsumer, Mutation } from 'react-apollo'

import { MenuItem } from '@material-ui/core'

import { SIGN_OUT } from '../../../graphql'

class SignOut extends React.Component {
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={SIGN_OUT}
            onCompleted={data => {
              localStorage.clear()
              client.writeData({
                data: { isSignedIn: !!localStorage.getItem('user') }
              })
            }}
          >
            {(signOut, { loading, error }) => {
              if (error) return error

              let signOutBtn = ''
              if (this.props.component === 'MenuItem') {
                signOutBtn = (
                  <MenuItem onClick={() => signOut()}>
                    {this.props.label}
                  </MenuItem>
                )
              }

              return signOutBtn
            }}
          </Mutation>
        )}
      </ApolloConsumer>
    )
  }
}

export default SignOut
