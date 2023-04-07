import { GlassBadge } from '@/components/glass'
import styles from './TrainersList.module.scss'
import { useUser } from '@/context/UserContext'
import { TrainerWithTeams } from '@/types/models'

export default function TrainersList() {
  const { setCurrentTrainer, trainers } = useUser()

  /**
   * Sets trainer as current user
   * @param user
   */
  const setCurrentUser = (user: TrainerWithTeams) => {
    setCurrentTrainer(user)
  }

  return (
    <section className={styles['trainers-list']}>
      <ul className="container">
        {trainers?.length > 0 &&
          trainers?.map((trainer, i) => (
            <li key={i}>
              <GlassBadge
                type="trainer"
                attributes={{ title: trainer.username, subtitle: `${trainer.teams?.length} teams` }}
                onClick={() => setCurrentUser(trainer)}
              />
            </li>
          ))}
      </ul>
    </section>
  )
}
