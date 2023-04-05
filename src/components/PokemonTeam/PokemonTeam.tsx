import { useState } from 'react'
import styles from './PokemonTeam.module.scss'
import { PokemonCard } from '@/components'
import { ApiPokemon } from '@/services/pokeApiService'

export type PokemonTeamProps = {
  team: ApiPokemon[]
}

export default function PokemonTeam({ team }: PokemonTeamProps) {
  const [loaded, setLoaded] = useState(true)

  return (
    <>
      {loaded && (
        <ul className={styles['pokemon-team']}>
          {team.map((pokemon, index) => (
            <li key={index}>
              <PokemonCard pkmn={pokemon} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
