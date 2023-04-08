import { GlassBadge } from '@/components/glass'
import styles from './TrainersList.module.scss'
import { useUser } from '@/context/UserContext'
import type { TrainerWithTeams } from '@/types/models'
import classNames from 'classnames'

const TrainersList = () => {
  const { setCurrentTrainer, trainers } = useUser()

  /**
   * Sets trainer as current user
   * @param user
   */
  const setCurrentUser = (user: TrainerWithTeams) => {
    setCurrentTrainer(user)
  }

  return (
    <ul className={classNames('container', styles['trainers-list'])}>
      {trainers?.length > 0 &&
        trainers?.map((trainer, i) => (
          <li key={i}>
            <GlassBadge
              type="trainer"
              attributes={{ title: trainer.username, subtitle: `${trainer.teams?.length || '0'} teams` }}
              onClick={() => setCurrentUser(trainer)}
            />
          </li>
        ))}
    </ul>
  )
}

export default TrainersList
