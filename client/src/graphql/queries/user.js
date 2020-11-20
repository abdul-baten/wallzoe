import gql from 'graphql-tag'
import _ from 'lodash'

import { client } from '../client'

export const hasUsername = async inputUsername => {
  const query = gql`
    query HasUsername($username: String!) {
      hasUsername(username: $username)
    }
  `
  const getUsername = await client.query({
    query,
    variables: { username: inputUsername }
  })
  return getUsername.data.hasUsername
}

export const hasEmail = async inputEmail => {
  const query = gql`
    query HasEmail($email: String!) {
      hasEmail(email: $email)
    }
  `
  const getEmail = await client.query({
    query,
    variables: { email: inputEmail }
  })

  return getEmail.data.hasEmail
}

export const hasUserById = async inputUserId => {
  const query = gql`
    query HasUserById($userId: String!) {
      hasUserById(userId: $userId)
    }
  `
  const getUser = await client.query({
    query,
    variables: { userId: inputUserId }
  })

  return getUser.data.hasUserById
}

export const signUp = async (username, email, password, confirmPassword) => {
  const mutation = gql`
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
  const user = await client.mutate({
    mutation,
    variables: { username, email, password, confirmPassword }
  })

  if (!_.isEmpty(user.data.signUp)) {
    return user.data.signUp
  }
}

export const signOut = async () => {
  const mutate = await client.mutate({
    mutation: gql`
      mutation {
        signOut
      }
    `
  })
  return mutate.data.signOut
}
