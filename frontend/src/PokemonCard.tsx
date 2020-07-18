import React from 'react'

export type PokemonCardInfo = {
    name: string,
    id: number,
    type: string[],
    sprite: string,
    likes: number
}

const PokemonCard = ({ name, id, type, sprite, likes }: PokemonCardInfo) => {
    return (
        <section className="w-64 mb-6">
            <div className="bg-white rounded-lg p-6">
                <img className="h-32 mx-auto" src={sprite} alt={name} />
                <div className="text-center">
                    <h2 className="text-xl">{name}</h2>
                    <div className="text-purple-500">#{id}</div>
                    <div className="text-gray-600">{type}</div>
                </div>
                <div className="flex flex-col mt-4 items-center">
                    <svg className="grow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path className="normal" d="M17.867 3.493l4.133 3.444v5.127l-10 8.333-10-8.334v-5.126l4.133-3.444 5.867 3.911 5.867-3.911zm.133-2.493l-6 4-6-4-6 5v7l12 10 12-10v-7l-6-5z" />
                        <path className="hover" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
                    </svg>
                    <div className="mt-2 text-gray-500">{likes}</div>
                </div>
            </div>
        </section>
    )
}

export default PokemonCard