import gql from 'graphql-tag'

export const ADD_POST = gql`
  mutation AddPost(
    $accountType: String!
    $accountId: String!
    $accessToken: String!
    $scheduleAt: Int!
    $tzOffset: Int!
    $textContent: String
    $files: [Upload!]!
  ) {
    addPost(
      accountType: $accountType
      accountId: $accountId
      accessToken: $accessToken
      scheduleAt: $scheduleAt
      tzOffset: $tzOffset
      textContent: $textContent
      files: $files
    ) {
      accountType
      accountId
      accessToken
      scheduleAt
      tzOffset
      isPublished
      textContent
      files {
        imgUrls
        vidUrls
      }
    }
  }
`
