import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { withClientState } from 'apollo-link-state';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloLink } from 'apollo-link';
import gql from 'graphql-tag';

import { AUTH_TOKEN } from './constants';
import './index.css';
import App from './components/App/App';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3000`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN),
    },
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink),
);

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
  link,
  cache
})



ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker();
