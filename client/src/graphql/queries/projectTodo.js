import gql from 'graphql-tag'

import { client } from '../client'

export const hasProjectTodoName = async inputName => {
  const query = gql`
    query hasProjectTodoName($name: String!) {
      hasProjectTodoName(name: $name)
    }
  `
  const getProjectTodoName = await client.query({
    query,
    variables: { name: inputName }
  })
  return getProjectTodoName.data.hasProjectTodoName
}