import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import GetAllPokemon from './GetAllPokemon'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql/',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GetAllPokemon />
    </ApolloProvider>
  );
}

export default App;
