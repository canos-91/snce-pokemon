import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function PokemonCard() {
  const [pokemon, setPokemon] = useState<any>([])
  const [input, setInput] = useState<string>('')

  const getPkmn = () => {
    axios
      .get('http://localhost:3000/api/pokemon/' + input)
      .then((response) => {
        if (response.data) {
          setPokemon(response.data)
        }
      })
      .catch((e) => console.log(e))
  }

  return (
    <>
      <div>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setInput(e.target.value)}
        />
        {pokemon.sprite && (
          <Image
            src={pokemon.sprite}
            alt=""
            width={100}
            height={100}
            priority
          ></Image>
        )}
        <h1> {pokemon.name}</h1>
        <h2 onClick={getPkmn}>GET</h2>
      </div>
    </>
  )
}
