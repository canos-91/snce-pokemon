import Head from 'next/head'
import styles from './CreateTeamPage.module.scss'
import classNames from 'classnames'
import { PokemonRandom } from '@/components/pokemon'
import { TeamPokemons } from '@/components/team'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { useUser } from '@/context/UserContext'
import { NewTeamForm } from '@/components/forms'
import { Button } from '@/components/atoms'
import { useRef } from 'react'
import type { SaveTeam } from '@/components/team/TeamPokemons/TeamPokemons'

const CreateTeamPage = () => {
  useAuthGuard()

  const { currentTeam } = useUser()
  const save = useRef<SaveTeam>(null)

  return (
    <>
      <Head>
        <title>PT | Create new team</title>
        <meta name="description" content="Pokémon Trainer - Create new team" />
      </Head>
      <main className={classNames(styles['create-team-page'])}>
        {!currentTeam ? (
          <section className={styles['create-new']}>
            <NewTeamForm />
          </section>
        ) : (
          <>
            <section className={styles['add-to-team']}>
              {/* Random Pkmn */}
              <div>
                <h4 className={styles['section-title']}>Get random Pokémon</h4>
                <PokemonRandom />
              </div>

              {/* Team Pokemons */}
              <div>
                <div className={styles['section-title']}>
                  <h4>{`'${currentTeam?.name}' team Pokémons`}</h4>
                  <Button
                    action="Save team"
                    color="accent"
                    onClick={() => {
                      save.current?.saveTeam()
                    }}
                  />
                </div>
                <TeamPokemons ref={save} />
              </div>
            </section>
          </>
        )}
      </main>
    </>
  )
}

export default CreateTeamPage
