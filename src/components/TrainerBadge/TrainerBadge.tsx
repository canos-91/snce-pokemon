import { useState, HTMLAttributes } from 'react'

import styles from './TrainerBadge.module.scss'
import PokeBallColorSvg from '@public/assets/svg/pokeball_color.svg'
import { Pokemon, Trainer } from '@prisma/client'

export interface CardPokemon extends Pokemon {
  types: { type: { name: string; url: string } }[]
  abilities: { ability: { name: string; url: string } }[]
}

interface TrainerBadgeProps extends HTMLAttributes<HTMLDivElement> {
  trainer: Trainer
}

export default function TrainerBadge({ trainer, ...attrs }: TrainerBadgeProps) {
  const [isActive, setActive] = useState(false)

  return (
    <div className={styles['trainer-badge']} {...attrs}>
      <PokeBallColorSvg className={styles.pokeball} />
      {/* Username */}
      <span className="bold">{trainer.username}</span>
    </div>
  )
}
