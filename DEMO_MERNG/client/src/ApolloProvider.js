import React from 'react'
import App from './App'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'
import  {onError} from 'apollo-link-error'
const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql'
})
const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken')
    return {
        headers  :{
            Authorization : token ? `Bearer ${token}` : ``
        }
    }

})
const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
  })
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

const ApolloProvide = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
export default ApolloProvide