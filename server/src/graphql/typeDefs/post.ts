import { gql } from 'apollo-server-express'

export default gql`
  extend type Mutation {
    addPost(
      accountType: String!
      accountId: String!
      accessToken: String!
      scheduleAt: Int!
      tzOffset: Int!
      textContent: String
      files: [Upload]!
    ): Post @auth
  }
  type Post {
    accountType: String!
    accountId: String!
    accessToken: String!
    scheduleAt: Int!
    tzOffset: Int!
    isPublished: Boolean!
    textContent: String
    files: Files
  }

  type Files {
    imgUrls: [String!]!
    vidUrls: [String!]!
  }
`
