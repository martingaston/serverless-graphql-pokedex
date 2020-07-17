import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import PokemonCard from './PokemonCard'

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

const pikachu = {
  name: "pikachu",
  id: 25,
  type: ["electric"],
  sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  likes: 5,
}

const ditto = {
  name: "ditto",
  id: 132,
  type: ["normal"],
  sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
  likes: 404,
}

function App() {
  return (
    <>
      <PokemonCard {...pikachu} />
      <PokemonCard {...ditto} />
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </>
  );
}

export default App;
