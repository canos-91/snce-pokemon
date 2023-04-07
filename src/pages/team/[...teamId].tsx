import Head from 'next/head'
import styles from './EditTeam.module.scss'
import classNames from 'classnames'
import { PokemonRandom } from '@/components/pokemon'
import { Team } from '@/components/team'
import type { PokemonWithRelations } from '@/types/models'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useUser } from '@/context/UserContext'
import { useEffect, useRef } from 'react'
import { axiosClient } from '@/lib/apiClient'
import { SaveTeam } from './create'
import { TeamEditForm } from '@/components/forms'

interface EditTeamProps {
  teamId?: number
}

export default function EditTeam({ teamId }: EditTeamProps) {
  useAuthGuard({ team: true })

  const { currentTeam, setTeamPokemons, setCurrentTeam } = useUser()
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
          </div>
          <Team deleteFromTeam ref={save} />
        </div>
      </main>
    </>
  )
}
