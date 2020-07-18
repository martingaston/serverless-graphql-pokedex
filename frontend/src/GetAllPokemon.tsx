import React from 'react'
import { useQuery, useMutation, gql } from '@apollo/client';
import PokemonCard, { PokemonCardInfo } from './PokemonCard'
import Spinner from './Spinner'

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
const LIKE_POKEMON = gql`
mutation likePokemon($id: ID!) {
    likePokemon(id: $id) {
      id
      likes
    }
  }
`

const GetAllPokemon = () => {
  const { loading, error, data } = useQuery(QUERY_ALL_POKEMON)
  const [addLike] = useMutation(LIKE_POKEMON);

  if (loading) return <Spinner />
  if (error) return <p>Error...</p>

  return data.allPokemon.map((card: PokemonCardInfo) => (
    <PokemonCard {...card} addLike={addLike} />
  ))
}

export default GetAllPokemon