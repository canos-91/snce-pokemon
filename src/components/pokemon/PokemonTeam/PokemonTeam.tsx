import styles from './PokemonTeam.module.scss'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import classNames from 'classnames'
import { PokemonBadge } from '@/components/pokemon'
import type { PokemonWithRelations, TeamWithRelations } from '@/types/models'
import { axiosClient } from '@/lib/apiClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useUser } from '@/context/UserContext'

interface PokemonTeamProps {
  pokemons: PokemonWithRelations[]
  setPokemons: (pkmns: PokemonWithRelations[]) => void
}

export default function PokemonTeam(props: PokemonTeamProps) {
  const { team, setUserTeam } = useUser()

  const { pokemons, setPokemons } = props

  /**
   * Retrieve, set and format team on mount
   */
  // useEffect(() => {
  //   if (teamId !== undefined) {
  //     const readTeam = async (): Promise<void> => {
  //       setUserTeam(await axiosClient.get(`/api/team/${teamId}`))
  //     }
  //     readTeam()

  //     const pkmns: PokemonWithRelations[] = team?.pokemons?.map((tp) => tp.pokemon) || []
  //     setPokemons(pkmns)
  //   }
  // }, [pokemons, setPokemons, setUserTeam, team, teamId])

  /**
   * Remove Pokémon from team
   */
  const removePkmn = async (pkmn: PokemonWithRelations, idx: number) => {
    setPokemons(pokemons.filter((p, i) => i !== idx))

    if (team) {
      const removed: boolean = await axiosClient.delete(`/api/team/pokemon/delete`, {
        data: {
          teamId: team.id,
          pokemonId: pkmn.id,
        },
      })

      // if (removed) {
      //   const { pokemons, ...rest } = team
      //   setTeam({ pokemons: pokemons.filter((p) => p.pokemon.id !== pkmn.id), ...rest })
      // }
    }
  }

  return (
    <>
      {pokemons.length > 0 && (
        <section className={classNames(styles['pokemon-team'], 'container')}>
          {pokemons.map((pokemon, index) => (
            <div className={styles.item} key={index}>
              <FontAwesomeIcon
                className={styles.remove}
                icon={faX}
                style={{ fontSize: 12 }}
                onClick={() => removePkmn(pokemon, index)}
              />
              <PokemonBadge pkmn={pokemon} />
            </div>
          ))}
        </section>
      )}
    </>
  )
}
