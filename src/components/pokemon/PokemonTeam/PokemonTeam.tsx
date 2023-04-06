import styles from './PokemonTeam.module.scss'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { PokemonBadge } from '@/components/pokemon'
import { PokemonWithRelations, TeamWithRelations } from '@/types/models'
import { axiosClient } from '@/lib/apiClient'

interface PokemonTeamProps {
  pokemons?: PokemonWithRelations[]
  team?: TeamWithRelations
  teamId?: number
}

export default function PokemonTeam(props: PokemonTeamProps) {
  const [pokemons, setPokemons] = useState<PokemonWithRelations[]>([])
  const [team, setTeam] = useState<TeamWithRelations | null>(null)

  /**
   * Retrieve, set and format team on mount
   */
  useEffect(() => {
    if (props.teamId) {
      const readTeam = async (): Promise<void> => {
        setTeam(await axiosClient.get(`/api/team/${props.teamId}`))
      }
      readTeam()

      if (team) {
        const pkmns: PokemonWithRelations[] = team.pokemons?.map((tp) => tp.pokemon) || []
        setPokemons(pkmns)
      }
    } else if (props.team) {
      setTeam(props.team)
    }

    if (props.pokemons) {
      setPokemons(props.pokemons)
    }
  }, [props.pokemons, props.team, props.teamId, team])

  return (
    <>
      {pokemons.length && (
        <section className={classNames(styles['pokemon-team'], 'container')}>
          {pokemons.map((pokemon, index) => (
            <PokemonBadge key={index} pkmn={pokemon} />
          ))}
        </section>
      )}
    </>
  )
}
