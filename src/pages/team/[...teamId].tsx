import Head from 'next/head'
import styles from './EditTeamPage.module.scss'
import classNames from 'classnames'
import { PokemonRandom } from '@/components/pokemon'
import { TeamPokemons } from '@/components/team'
import type { PokemonWithRelations } from '@/types/models'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useUser } from '@/context/UserContext'
import { FormEvent, useEffect, useRef } from 'react'
import { axiosClient } from '@/lib/apiClient'
import type { SaveTeam } from '@/components/team/TeamPokemons/TeamPokemons'
import { TeamEditForm } from '@/components/forms'
import { Button } from '@/components/atoms'
import router from 'next/router'

interface EditTeamPageProps {
  teamId?: number
}

const EditTeamPage = ({ teamId }: EditTeamPageProps) => {
  useAuthGuard({ team: true })

  const { currentTeam, setTeamPokemons, setCurrentTeam, setCurrentTrainer, trainer } = useUser()
  const save = useRef<SaveTeam>(null)

  /**
   * Retrieve team on mount
   */
  useEffect(() => {
    if (teamId !== undefined) {
      const readTeam = async (): Promise<void> => {
        setCurrentTeam(await axiosClient.get(`/api/team/${teamId}`))
      }

      readTeam()
    }

    const pkmns: PokemonWithRelations[] = currentTeam?.pokemons?.map((tp) => tp.pokemon) || []
    setTeamPokemons(pkmns)
  }, [currentTeam?.pokemons, setCurrentTeam, setTeamPokemons, teamId])

  /**
   * Delete team
   */
  const deleteTeam = async (event: FormEvent) => {
    event.preventDefault()

    if (currentTeam && trainer) {
      const deleted: boolean = await axiosClient.delete(`/api/team/${currentTeam.id}`)

      if (deleted === true) {
        const { teams, ...rest } = trainer
        const filteredTeams = teams?.filter((t) => t.id !== currentTeam.id)
        setCurrentTrainer({ ...rest, teams: filteredTeams })
        setCurrentTeam(null)
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
          <PokemonRandom save />

          {/* Team edit */}
          <div className="mt-48">
            <TeamEditForm />
          </div>
        </div>

        {/* Team Pokemons */}
        <div>
          <div className={styles['section-title']}>
            <h4>{`'${currentTeam?.name}' team Pokémons`}</h4>
            <div className={styles.actions}>
              <Button
                action="Save team"
                color="accent"
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
