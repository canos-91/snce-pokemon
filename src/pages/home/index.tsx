/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import styles from './Home.module.scss'
import { useUser } from '@/context/UserContext'
import { useEffect, useState, useMemo } from 'react'
import { axiosClient } from '@/lib/apiClient'
import { Trainer } from '@prisma/client'
import classNames from 'classnames'
import { Button, Input } from '@/components/atoms'
import { TrainerBadge } from '@/components'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const [username, setUsername] = useState<string>('')
  const { setTrainer, setTrainersList, trainers } = useUser()

  const trainerNames: string[] = useMemo(() => trainers.map((t) => t.username), [trainers])

  /**
   * Load stored trainers
   */
  useEffect(() => {
    const getTrainers = async () => {
      const dbTrainers: Trainer[] | undefined = await axiosClient.get(`/api/trainer/list`)

      if (dbTrainers) {
        setTrainersList(dbTrainers)
      }
    }
    getTrainers()
  }, [])

  /**
   * Creates a new trainer
   */
  const createTrainer = async (username: string) => {
    const trainer: Trainer | undefined = await axiosClient.post(`/api/trainer/create`, { username })
    if (trainer) {
      // if (!trainerNames.includes(created.username)) setTrainersList([...trainers, created])
      setCurrentUser(trainer)
    }
  }

  /**
   * Sets current user as trainer
   * @param user
   */
  const setCurrentUser = (user: Trainer) => {
    setTrainer(user)
    router.push('/team/create')
  }

  return (
    <>
      <Head>
        <title>{`Pokémon Trainer- Gotta catch 'em all!`}</title>
        <meta name="description" content="Become the best Pokémon trainer in the world!" />
      </Head>
      <main className={classNames(styles['home-page'])}>
        {/* New trainer */}
        <h2 className={styles.title}>Select your profile or create one</h2>
        <section className={styles['new-user']}>
          <Input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username"></Input>
          <Button
            onClick={() => createTrainer(username)}
            action="Create account"
            color="accent"
            disabled={!username || trainerNames.includes(username)}
          />
        </section>

        {/* Trainers */}
        <section className={classNames(styles.trainers)}>
          <h3 className="mb-8">Trainers</h3>
          <ul className="container">
            {trainers.map((trainer, i) => (
              <li key={i}>
                <TrainerBadge trainer={trainer} onClick={() => setCurrentUser(trainer)} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
