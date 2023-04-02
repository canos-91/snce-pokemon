import Image from 'next/image'
import { useEffect, useState } from 'react'
import style from './PokemonCard.module.scss'
import { pokemonService } from '@/services'
import type { IPokemon } from '@/types/models/Pokemon'

// export type ExampleComponentProps = {
//   // ...
// }

export default function PokemonCard() {
  const [pokemon, setPokemon] = useState<IPokemon | undefined>()
  const [input, setInput] = useState<string>('')

  const getPkmn = async () => {
    if (input) {
      // axios
      //   .get('http://localhost:3000/api/pokemon/' + input)
      //   .then((response) => {
      //     if (response.data) {
      //       setPokemon(response.data)
      //     }
      //   })
      //   .catch((e) => console.log(e))
      const res = await pokemonService.getPokemonByName(input)
      console.log(res)
      setPokemon(res)
    }
  }

  return (
    <>
      <input
        type="text"
        name=""
        id=""
        onChange={(e) => setInput(e.target.value)}
      />
      <h2 onClick={getPkmn}>GET</h2>
      {pokemon && (
        <div>
          <Image
            src={pokemon.sprite}
            alt=""
            width={100}
            height={100}
            priority
          ></Image>
          <h1 className={style.title}> {pokemon.name}</h1>
        </div>
      )}
    </>
  )
}
