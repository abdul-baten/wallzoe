import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { GRAPHQL_URL } from '../config'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

export const cache = new InMemoryCache()

export const client = new ApolloClient({
  link: createUploadLink({
    uri: GRAPHQL_URL,
    credentials: 'include'
  }),
  cache, // event default has InMemoryCache, use my instance
  clientState: {
    typeDefs,
    resolvers
  }
})
