import Head from 'next/head'
import styles from './HomePage.module.scss'
import classNames from 'classnames'
import { useUser } from '@/context/UserContext'
import { useEffect, useState } from 'react'
import { TrainersList } from '@/components/trainer'
import type { TrainerWithTeams } from '@/types/models'
import { NewTrainerForm } from '@/components/forms'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faPenSquare, faBars, faSquarePollHorizontal } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import TeamsList from '@/components/team/TeamsList/TeamsList'
import { loadTrainers } from '@/lib/loadTrainers'

interface HomePageProps {
  fetchedTrainers: TrainerWithTeams[]
}

/**
 * Load stored trainers before mount
 */
export async function getStaticProps() {
  const fetchedTrainers = await loadTrainers()

  return {
    props: {
      fetchedTrainers,
    },
  }
}

const HomePage = ({ fetchedTrainers }: HomePageProps) => {
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
            <h1 className="mb-48">Where do we start?</h1>

            {/* Create or edit team */}
            <div className={classNames(styles['create-edit'])}>
              <Link href="/team/create" className={classNames('glass-box', styles.link)}>
                <FontAwesomeIcon icon={faSquarePlus} style={{ fontSize: 50 }} />
                <span>Create team</span>
              </Link>

              <div
                className={classNames('glass-box', styles.link, !trainer.teams?.length && styles.disabled)}
                onClick={showTeams}
              >
                <FontAwesomeIcon icon={faPenSquare} style={{ fontSize: 50 }} />
                <span>Edit team</span>
              </div>

              <Link
                href="/team/list"
                className={classNames('glass-box', styles.link, !trainer.teams?.length && styles.disabled)}
              >
                <FontAwesomeIcon icon={faSquarePollHorizontal} style={{ fontSize: 50 }} />
                <span>Your teams</span>
              </Link>
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

export default HomePage
