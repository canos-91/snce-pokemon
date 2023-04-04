import { useState } from 'react'
import styles from './PokemonTeam.module.scss'
import { Pokemon } from '@/types/models/Pokemon'
import { PokemonCard } from '@/components'

export type PokemonTeamProps = {
  team: Pokemon[]
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
