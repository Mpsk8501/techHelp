import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { graphQlUrl } from '../settings'

const httpLink = createHttpLink({
  uri: graphQlUrl,
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const baseToken = localStorage.getItem('baseToken')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: baseToken ? `Basic ${baseToken}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
