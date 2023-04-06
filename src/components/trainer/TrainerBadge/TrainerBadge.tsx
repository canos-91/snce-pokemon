import { HTMLAttributes } from 'react'

import styles from './TrainerBadge.module.scss'
import PokeBallColorSvg from '@public/assets/svg/pokeball_color.svg'
import { TrainerWithTeams } from '@/types/models'

interface TrainerBadgeProps extends HTMLAttributes<HTMLDivElement> {
  trainer: TrainerWithTeams
}

export default function TrainerBadge({ trainer, ...attrs }: TrainerBadgeProps) {
  return (
    <div className={styles['trainer-badge']} {...attrs}>
      <PokeBallColorSvg className={styles.pokeball} />
      {/* Username */}
      <div className={styles.attributes}>
        <span className={styles.username}>{trainer.username}</span>
        <small className={styles.teams}>{trainer.teams.length} teams</small>
      </div>
    </div>
  )
}
