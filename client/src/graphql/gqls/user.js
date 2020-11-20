import gql from 'graphql-tag'

export const IS_SIGNED_IN = gql`
  query IsSignedIn {
    isSignedIn @client
  }
`

export const SIGN_UP = gql`
  mutation SignUp(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signUp(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      _id
      username
      email
    }
  }
`

export const SIGN_IN = gql`
  mutation SingIn($usernameOrEmail: String!, $password: String!) {
    signIn(usernameOrEmail: $usernameOrEmail, password: $password) {
      _id
      username
      email
    }
  }
`
export const SIGN_OUT = gql`
  mutation {
    signOut
  }
`
export const ALL_USERS = gql`
  query HasAllUsers {
    hasAllUsers {
      _id
      username
    }
  }
`
