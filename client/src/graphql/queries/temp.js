import gql from 'graphql-tag'
import { client } from '../client'

export const setAuthFor = async authFor => {
  const mutation = gql`
    mutation SetAuthFor($authFor: String) {
      setAuthFor(authFor: $authFor)
    }
  `
  try {
    const tempData = await client.mutate({
      mutation,
      variables: {
        authFor
      }
    })
    return tempData.data.setAuthFor
  } catch (err) {
    console.log(err)
  }
}
