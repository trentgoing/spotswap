import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { withClientState } from 'apollo-link-state';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import gql from 'graphql-tag';

const cache = new InMemoryCache();

const defaultState = {
  'currentSearch': {
    __typename: 'currentSearch',
    searchInput: 'Search for a spot here!'
  }
}

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    Mutation: {
      updateSearch: (_, { index, value }, { cache }) => {
        const query = gql`
          query GetCurrentSearch {
            currentSearch @client {
              __typename
              searchInput
            }
          }
        `
        const previousState = cache.readQuery({query});
        const data = {
          ...previousState,
          currentSearch: {
            ...previousState.currentSearch,
            [index]: value
          }
        }
        cache.writeData({query, data})
      }
    }
  },
})

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    new HttpLink({ uri: 'http://localhost:3000/graphql' })
  ])
})



ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker();
