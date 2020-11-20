import gql from 'graphql-tag'
export const SOCIAL_ACCOUNTS = gql`
  query {
    socialAccounts {
      accountType
      accountId
      accessToken
      pictureUrl
      userName
      email
      pages {
        id
        name
        accessToken
        pictureUrl
      }
      groups {
        id
        name
        privacy
        pictureUrl
      }
    }
  }
`
