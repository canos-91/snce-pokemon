/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import styles from './Home.module.scss'
import { useUser } from '@/context/UserContext'
import { useEffect, useState, useMemo } from 'react'
import { axiosClient } from '@/lib/apiClient'
import { Trainer } from '@prisma/client'
import classNames from 'classnames'
import { Button, Input } from '@/components/atoms'

export default function Home() {
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
    const created: Trainer | undefined = await axiosClient.post(`/api/trainer/create`, { username })
    if (created) {
      if (!trainerNames.includes(created.username)) setTrainersList([...trainers, created])
      setTrainer(created)
    }
  }

  return (
    <>
      <Head>
        <title>{`Pokémon Trainer- Gotta catch 'em all!`}</title>
        <meta name="description" content="Become the best Pokémon trainer in the world!" />
      </Head>
      <main className={classNames(styles['home-page'])}>
        <section className={classNames(styles.trainers, 'container')}>
          <ul>
            {trainers.map((trainer, i) => (
              <li key={i}>{trainer.username}</li>
            ))}
          </ul>
        </section>
        <section className={styles['new-user']}>
          <Input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username"></Input>
          <Button
            onClick={() => createTrainer(username)}
            action="Add new trainer"
            color="accent"
            disabled={!username || trainerNames.includes(username)}
          />
        </section>
      </main>
    </>
  )
}
