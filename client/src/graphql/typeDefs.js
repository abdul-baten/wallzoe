import gql from 'graphql-tag'

export default gql`
  type Query {
    me: Me
  }
  type Me {
    _id: ID!
    username: String!
    email: String!
  }
`
