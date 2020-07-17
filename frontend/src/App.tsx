import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

function App() {
  return (
    <>
      <section className="w-64 mb-6">
        <div className="bg-white rounded-lg p-6">
          <img className="h-32 mx-auto" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" />
          <div className="text-center">
            <h2 className="text-xl">Ditto</h2>
            <div className="text-purple-500">#132</div>
            <div className="text-gray-600">Normal</div>
          </div>
          <div className="flex flex-col mt-4 items-center">
            <svg className="grow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path className="normal" d="M17.867 3.493l4.133 3.444v5.127l-10 8.333-10-8.334v-5.126l4.133-3.444 5.867 3.911 5.867-3.911zm.133-2.493l-6 4-6-4-6 5v7l12 10 12-10v-7l-6-5z" />
              <path className="hover" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
            </svg>
            <div className="mt-2 text-gray-500">5</div>
          </div>
        </div>
      </section>
      <section className="w-64 mb-6">
        <div className="bg-white rounded-lg p-6">
          <img className="h-32 mx-auto" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" />
          <div className="text-center">
            <h2 className="text-xl">Pikachu</h2>
            <div className="text-purple-500">#25</div>
            <div className="text-gray-600">Electric</div>
          </div>
          <div className="flex flex-col mt-4 items-center">
            <svg className="grow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path className="normal" d="M17.867 3.493l4.133 3.444v5.127l-10 8.333-10-8.334v-5.126l4.133-3.444 5.867 3.911 5.867-3.911zm.133-2.493l-6 4-6-4-6 5v7l12 10 12-10v-7l-6-5z" />
              <path className="hover" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
            </svg>
            <div className="mt-2 text-gray-500">128</div>
          </div>
        </div>
      </section>
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </>
  );
}

export default App;
