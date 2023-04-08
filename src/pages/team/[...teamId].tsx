import Head from 'next/head'
import styles from './EditTeamPage.module.scss'
import classNames from 'classnames'
import { PokemonRandom } from '@/components/pokemon'
import { TeamPokemons } from '@/components/team'
import type { PokemonWithRelations, TeamWithRelations } from '@/types/models'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useUser } from '@/context/UserContext'
import { FormEvent, useEffect, useRef } from 'react'
import { axiosClient } from '@/lib/apiClient'
import type { SaveTeam } from '@/components/team/TeamPokemons/TeamPokemons'
import { TeamEditForm } from '@/components/forms'
import { Button } from '@/components/atoms'
import router from 'next/router'
import { useTeam } from '@/context/TeamContext'

interface EditTeamPageProps {
  teamId?: number
}

const EditTeamPage = ({ teamId }: EditTeamPageProps) => {
  useAuthGuard({ team: true })

  const { setCurrentTrainer, trainer } = useUser()
  const { team, setPokemons, setTeam, hasChanges } = useTeam()
  const save = useRef<SaveTeam>(null)

  /**
   * Retrieve team on mount
   */
  useEffect(() => {
    if (teamId !== undefined) {
      const readTeam = async (): Promise<void> => {
        const read = await axiosClient.get<TeamWithRelations>(`/api/team/${teamId}`)
        setTeam(read || null)
      }

      readTeam()
    }

    const pkmns: PokemonWithRelations[] = team?.pokemons?.map((tp) => tp.pokemon) || []
    setPokemons(pkmns)
  }, [team?.pokemons, setTeam, setPokemons, teamId])

  /**
   * Delete team
   */
  const deleteTeam = async (event: FormEvent) => {
    event.preventDefault()

    if (team && trainer) {
      const deleted = await axiosClient.delete<boolean>(`/api/team/${team.id}`)

      if (deleted) {
        const { teams, ...rest } = trainer
        const filteredTeams = teams?.filter((t) => t.id !== team.id)
        setCurrentTrainer({ ...rest, teams: filteredTeams })
        setTeam(null)
        router.push('/home')
      }
    }
  }

  return (
    <>
      <Head>
        <title>PT | Edit team</title>
        <meta name="description" content="Pokémon Trainer - Edit team" />
      </Head>
      <main className={classNames(styles['edit-team-page'])}>
        {/* Random Pkmn */}
        <div>
          <h4 className={styles['section-title']}>Get random Pokémon</h4>
          <PokemonRandom />

          {/* Team edit */}
          <div className="mt-48">
            <TeamEditForm />
          </div>
        </div>

        {/* Team Pokemons */}
        <div>
          <div className={styles['section-title']}>
            <h4>{`'${team?.name}' team Pokémons`}</h4>
            <div className={styles.actions}>
              <Button
                action="Save team"
                color="accent"
                disabled={!hasChanges}
                onClick={() => {
                  save.current?.saveTeam()
                }}
              />
              <Button action="Delete" color="error" onClick={(event) => deleteTeam(event)} />
            </div>
          </div>
          <TeamPokemons deleteFromTeam ref={save} />
        </div>
      </main>
    </>
  )
}

export default EditTeamPage
