import styles from './TeamPokemons.module.scss'
import { PokemonBadge } from '@/components/pokemon'
import { useUser } from '@/context/UserContext'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { axiosClient } from '@/lib/apiClient'
import type { PokemonWithRelations, TeamWithRelations } from '@/types/models'
import { TeamPokemonData } from '@/services/teamService'
import { useTeam } from '@/context/TeamContext'

export interface SaveTeam {
  saveTeam(): Promise<void>
}

interface TeamPokemonsProps {
  deleteFromTeam?: boolean
  teamId?: number
}

const TeamPokemons = forwardRef<SaveTeam, TeamPokemonsProps>(({ teamId, deleteFromTeam = false }, ref) => {
  const { trainer, setCurrentTrainer } = useUser()
  const { team, pokemons } = useTeam()
  const [sectionTeam, setSectionTeam] = useState<TeamWithRelations | null>(null)
  const [sectionPokemons, setSectionPokemons] = useState<PokemonWithRelations[]>([])

  TeamPokemons.displayName = 'TeamPokemons'

  /**
   * Store team
   */
  useEffect(() => {
    // if (teamId) {
    //   setSectionTeam(sectionTeam)
    //   setSectionPokemons(pkmnTeam.pokemons?.map((tp) => tp.pokemon))
    // } else {
    setSectionTeam(team)
    setSectionPokemons(pokemons)
    // }
  }, [sectionTeam, team, pokemons])

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

        const saved = await axiosClient.post<TeamPokemonData[], TeamWithRelations>(`/api/team/pokemon/add`, payload)

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
    <section className={styles['pokemon-team']}>
      {sectionPokemons.map((pokemon, index) => (
        <PokemonBadge pkmn={pokemon} key={index} idx={index} deleteFromTeam={deleteFromTeam} />
      ))}
    </section>
  )
})
export default TeamPokemons
