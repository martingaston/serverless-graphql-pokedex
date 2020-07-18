import React from 'react'
import { useQuery, gql } from '@apollo/client';
import PokemonCard, { PokemonCardInfo } from './PokemonCard'

const QUERY_ALL_POKEMON = gql`
  query GetAllPokemon {
    allPokemon {
      id
      name
      sprite
      type
      likes
    }
  }
`
const GetAllPokemon = () => {
  const { loading, error, data } = useQuery(QUERY_ALL_POKEMON)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  return data.allPokemon.map((card: PokemonCardInfo) => (
    <PokemonCard {...card} />
  ))
}

export default GetAllPokemon