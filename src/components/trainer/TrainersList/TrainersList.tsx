import styles from './TrainersList.module.scss'
import { useUser } from '@/context/UserContext'
import { TrainerBadge } from '@/components/trainer'
import { TrainerWithTeams } from '@/types/models'

export default function TrainersList() {
  const { setTrainer, trainers } = useUser()

  /**
   * Sets trainer as current user
   * @param user
   */
  const setCurrentUser = (user: TrainerWithTeams) => {
    setTrainer(user)
  }

  return (
    <section className={styles['trainers-list']}>
      <ul className="container">
        {trainers.map((trainer, i) => (
          <li key={i}>
            <TrainerBadge trainer={trainer} onClick={() => setCurrentUser(trainer)} />
          </li>
        ))}
      </ul>
    </section>
  )
}
