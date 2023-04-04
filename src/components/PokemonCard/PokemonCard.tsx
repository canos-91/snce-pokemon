import { useState } from 'react'
import Image from 'next/image'
import styles from './PokemonCard.module.scss'
import { Pokemon } from '@/types/models/Pokemon'
import classNames from 'classnames'
import PokeBallSvg from '@public/pokeball.svg'
import { Badge } from '@/components/atoms'

export type PokemonCardProps = {
  pkmn: Pokemon
}

export default function PokemonCard({ pkmn }: PokemonCardProps) {
  const [isActive, setActive] = useState(false)

  return (
    <div
      className={classNames(styles['pokemon-card'], isActive && styles.active)}
      onClick={() => setActive(!isActive)}
    >
      <PokeBallSvg className={styles.pokeball} />
      <div className={styles.inner}>
        {/* Sprite */}
        <div className={styles.sprite}>
          <Image
            src={pkmn.sprite}
            alt={pkmn.name}
            fill
            // onLoadingComplete={() => setLoaded(true)}
            priority
          ></Image>
        </div>

        {/* Types */}
        <div className={classNames(styles.badges)}>
          {pkmn.types.map((type, index) => (
            <Badge key={index} label={type} color={type} />
          ))}
        </div>

        {/* Name */}
        <h3 className={classNames(styles['pkmn-name'], 'capital')}>
          {pkmn.name}
        </h3>
      </div>
    </div>
  )
}
