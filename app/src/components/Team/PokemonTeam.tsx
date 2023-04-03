import { useState } from 'react'
import style from './PokemonCard.module.scss'
import { IPokemon } from '@/types/models/Pokemon'
import PokemonCard from '../PokemonCard/PokemonCard'

export type PokemonTeamProps = {
  team: IPokemon[]
}

export default function PokemonTeam({ team }: PokemonTeamProps) {
  const [loaded, setLoaded] = useState(true)

  return (
    <>
      {loaded && (
        <ul className={style['pokemon-team']}>
          {team.map((pokemon, index) => (
            <li key={index}>
              <PokemonCard sprite={pokemon.sprite} pkmnName={pokemon.name} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
