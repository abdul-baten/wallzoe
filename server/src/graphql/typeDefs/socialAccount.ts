import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    socialAccounts: [SocialAccount!]! @auth
  }

  type SocialAccount {
    accountType: String!
    accountId: String!
    accessToken: String!
    userName: String
    email: String
    pictureUrl: String
    pages: [FbPage]
    groups: [FbGroup]
  }
  type FbPage {
    id: String!
    name: String!
    accessToken: String!
    pictureUrl: String
  }
  type FbGroup {
    id: String!
    name: String!
    privacy: String
    pictureUrl: String
  }
`
