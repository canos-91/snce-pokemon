import Head from 'next/head'
import styles from './Home.module.scss'
import classNames from 'classnames'
import { useUser } from '@/context/UserContext'
import { useEffect, useState } from 'react'
import { TrainersList } from '@/components/trainer'
import type { TrainerWithTeams } from '@/types/models'
import { NewTrainerForm } from '@/components/forms'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faPenSquare } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import TeamsList from '@/components/team/TeamsList/TeamsList'
import { loadTrainers } from '@/lib/loadTrainers'

interface HomeProps {
  fetchedTrainers: TrainerWithTeams[]
}

/**
 * Load stored trainers before mount
 */
export async function getStaticProps() {
  const fetchedTrainers: TrainerWithTeams[] | undefined = await loadTrainers()

  return {
    props: {
      fetchedTrainers,
    },
  }
}

export default function Home({ fetchedTrainers }: HomeProps) {
  const { trainer, setCurrentTrainersList, trainers } = useUser()
  const [isTeamListSet, setTeamList] = useState<boolean>(false)

  /**
   * Store fetched trainers
   */
  useEffect(() => {
    if (fetchedTrainers) {
      setCurrentTrainersList(fetchedTrainers)
    }
  }, [setCurrentTrainersList, fetchedTrainers])

  const showTeams = () => {
    setTeamList(true)
  }
  return (
    <>
      <Head>
        <title>{`Pokémon Trainer- Gotta catch 'em all!`}</title>
        <meta name="description" content="Become the best Pokémon trainer in the world!" />
      </Head>
      <main className={classNames(styles['home-page'])}>
        {!trainer ? (
          // Logged in
          <section className={styles['logged-out']}>
            {trainers.length > 0 && (
              <>
                <h2>Select your profile or create one</h2>

                {/* Trainers */}
                <TrainersList />
              </>
            )}

            {/* New trainer */}
            <NewTrainerForm />
          </section>
        ) : (
          // Logged out
          <section className={styles['logged-in']}>
            <h1>Where do we start?</h1>

            {/* Create or edit team */}
            <div className={classNames(styles['create-edit'])}>
              <Link href="/team/create" className={classNames('glass-box', styles.link)}>
                <FontAwesomeIcon icon={faSquarePlus} style={{ fontSize: 50 }} />
                <span>Create team</span>
              </Link>

              {!isTeamListSet && (
                <div
                  className={classNames('glass-box', styles.link, !trainer.teams?.length && styles.disabled)}
                  onClick={showTeams}
                >
                  <FontAwesomeIcon icon={faPenSquare} style={{ fontSize: 50 }} />
                  <span>Edit team</span>
                </div>
              )}
            </div>

            {/* Trainer's teams */}
            {isTeamListSet && (
              <div className={styles['trainer-teams']}>
                <h3>Select a team</h3>
                <TeamsList />
              </div>
            )}
          </section>
        )}
      </main>
    </>
  )
}
