import styles from './Team.module.scss'
import classNames from 'classnames'
import { PokemonBadge } from '@/components/pokemon'
import { useUser } from '@/context/UserContext'
import { forwardRef, useImperativeHandle } from 'react'
import { axiosClient } from '@/lib/apiClient'
import type { SaveTeam } from '@/pages/team/create'

interface TeamProps {
  deleteFromTeam?: boolean
}

const Team = forwardRef<SaveTeam, TeamProps>(({ deleteFromTeam = false }: TeamProps, ref) => {
  const { currentTeam, teamPokemons } = useUser()

  Team.displayName = 'Team'

  /**
   * Save current team Pokémons to DB
   */
  const saveTeam = async (): Promise<void> => {
    if (currentTeam) {
      try {
        const payload = teamPokemons.map((p) => ({
          teamId: currentTeam.id,
          pokemonId: p.id,
        }))

        await axiosClient.post(`/api/team/pokemon/save`, payload)
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
      {teamPokemons.map((pokemon, index) => (
        <PokemonBadge pkmn={pokemon} key={index} idx={index} deleteFromTeam={deleteFromTeam} />
      ))}
    </section>
  )
})
export default Team
