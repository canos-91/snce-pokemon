import styles from './Team.module.scss'
import classNames from 'classnames'
import { PokemonBadge } from '@/components/pokemon'
import { useUser } from '@/context/UserContext'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { axiosClient } from '@/lib/apiClient'
import type { SaveTeam } from '@/pages/team/create'
import type { PokemonWithRelations, TeamWithRelations } from '@/types/models'

interface TeamProps {
  deleteFromTeam?: boolean
  team?: TeamWithRelations
}

const Team = forwardRef<SaveTeam, TeamProps>(({ team, deleteFromTeam = false }: TeamProps, ref) => {
  const { trainer, currentTeam, teamPokemons, setCurrentTrainer } = useUser()
  const [sectionTeam, setSectionTeam] = useState<TeamWithRelations | null>(null)
  const [sectionPokemons, setSectionPokemons] = useState<PokemonWithRelations[]>([])

  Team.displayName = 'Team'

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

        const saved: TeamWithRelations | null = await axiosClient.post(`/api/team/pokemon/save`, payload)

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

  /**
   * Retrieve, set and format team on mount
   */
  // useEffect(() => {
  //   if (teamId !== undefined) {
  //     const readTeam = async (): Promise<void> => {
  //       setCurrentTeam(await axiosClient.get(`/api/team/${teamId}`))
  //     }
  //     readTeam()

  //     const pkmns: PokemonWithRelations[] = team?.pokemons?.map((tp) => tp.pokemon) || []
  //     setPokemons(pkmns)
  //   }
  // }, [pokemons, setPokemons, setCurrentTeam, team, teamId])

  // useEffect(() => {
  //   save.current = saveTeam
  // }, [])

  return (
    <section className={classNames(styles['pokemon-team'], 'container')}>
      {sectionPokemons.map((pokemon, index) => (
        <PokemonBadge pkmn={pokemon} key={index} idx={index} deleteFromTeam={deleteFromTeam} />
      ))}
    </section>
  )
})
export default Team
