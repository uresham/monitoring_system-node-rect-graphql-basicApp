import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client/core';
import { ApolloProvider } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { BrowserRouter } from 'react-router-dom';

import Routers from './router';
import reportWebVitals from './reportWebVitals';
import {ContextProvider} from './Context';

import './index.css';

const httpLink = new HttpLink({
  uri: 'http://localhost:4001/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4001/subscriptions',
}));

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({ link, cache: new InMemoryCache() });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ContextProvider>
        <Routers/>
      </ContextProvider>
    </BrowserRouter>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
