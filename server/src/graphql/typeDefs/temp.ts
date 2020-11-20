import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    getAuthFor: String @auth
  }
  extend type Mutation {
    setAuthFor(authFor: String): Boolean @auth
  }
`
