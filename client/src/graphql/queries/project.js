import gql from 'graphql-tag'

import { client } from '../client'

export const hasProjectName = async inputProjectName => {
  const query = gql`
    query HasProjectName($name: String!) {
      hasProjectName(name: $name)
    }
  `
  const getProjectName = await client.query({
    query,
    variables: { name: inputProjectName }
  })
  return getProjectName.data.hasProjectName
}
