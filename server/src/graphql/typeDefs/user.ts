import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    hasUsername(username: String!): Boolean!
    hasEmail(email: String!): Boolean!
    hasUserById(userId: ID!): Boolean!
    hasAllUsers: [User] @auth
  }
  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User @guest
    signIn(usernameOrEmail: String!, password: String!): User @guest
    signOut: Boolean @auth
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    isAdmin: Boolean
    adminId: ID
    role: Int
  }
`
