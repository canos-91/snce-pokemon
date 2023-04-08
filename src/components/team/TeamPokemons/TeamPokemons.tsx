import styles from './TeamPokemons.module.scss'
import classNames from 'classnames'
import { PokemonBadge } from '@/components/pokemon'
import { useUser } from '@/context/UserContext'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { axiosClient } from '@/lib/apiClient'
import type { PokemonWithRelations, TeamWithRelations } from '@/types/models'

export interface SaveTeam {
  saveTeam(): Promise<void>
}

interface TeamPokemonsProps {
  deleteFromTeam?: boolean
  team?: TeamWithRelations
}

const TeamPokemons = forwardRef<SaveTeam, TeamPokemonsProps>(({ team, deleteFromTeam = false }, ref) => {
  const { trainer, currentTeam, teamPokemons, setCurrentTrainer } = useUser()
  const [sectionTeam, setSectionTeam] = useState<TeamWithRelations | null>(null)
  const [sectionPokemons, setSectionPokemons] = useState<PokemonWithRelations[]>([])

  TeamPokemons.displayName = 'TeamPokemons'

  /**
   * Store team
   */
  useEffect(() => {
    if (team) {
      setSectionTeam(sectionTeam)
      setSectionPokemons(team.pokemons?.map((tp) => tp.pokemon))
    } else {
      setSectionTeam(currentTeam)
      setSectionPokemons(teamPokemons)
    }
  }, [team, sectionTeam, currentTeam, teamPokemons])

  /**
   * Save current team Pokémons to DB
   */
  const saveTeam = async (): Promise<void> => {
    if (sectionTeam && trainer) {
      try {
        const payload = sectionPokemons.map((p) => ({
          teamId: sectionTeam.id,
          pokemonId: p.id,
        }))

        const saved: TeamWithRelations | null = await axiosClient.post(`/api/team/pokemon/add`, payload)

        if (saved) {
          const { teams, ...rest } = trainer
          const trainerTeams = teams?.filter((t) => t.id !== sectionTeam.id) || []
          setCurrentTrainer({ ...rest, teams: [...trainerTeams, saved] })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  /**
   * Trigger save action from parent
   */
  useImperativeHandle(ref, () => ({ saveTeam }))

  return (
    <section className={classNames(styles['pokemon-team'], 'container')}>
      {sectionPokemons.map((pokemon, index) => (
        <PokemonBadge pkmn={pokemon} key={index} idx={index} deleteFromTeam={deleteFromTeam} />
      ))}
    </section>
  )
})
export default TeamPokemons
