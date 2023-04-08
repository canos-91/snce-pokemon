import styles from './NewTrainerForm.module.scss'
import { useUser } from '@/context/UserContext'
import { useState, useMemo, FormEvent } from 'react'
import { axiosClient } from '@/lib/apiClient'
import { Button, Input } from '@/components/atoms'
import { TrainerWithTeams } from '@/types/models'

const NewTrainerForm = () => {
  const [username, setUsername] = useState<string>('')
  const { trainers, setCurrentTrainer } = useUser()

  const usernames: string[] = useMemo(() => trainers.map((t) => t.username.toLowerCase()), [trainers])

  /**
   * Creates a new Trainer profile
   */
  const createTrainer = async (event: FormEvent) => {
    event.preventDefault()

    const trainer: TrainerWithTeams | undefined = await axiosClient.post(`/api/trainer/create`, { username })

    if (trainer) {
      setCurrentTrainer(trainer)
    }
  }

  return (
    <form onSubmit={createTrainer} className={styles['new-trainer-form']}>
      <div>
        <h2>Create new trainer profile</h2>
      </div>
      <Input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username" />
      <Button
        action="Create profile"
        color="accent"
        type="submit"
        disabled={!username || usernames.includes(username.toLowerCase())}
      />
    </form>
  )
}

export default NewTrainerForm
