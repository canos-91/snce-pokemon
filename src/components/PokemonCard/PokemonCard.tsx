import { useState } from 'react'
import Image from 'next/image'
import styles from './PokemonCard.module.scss'
import { IPokemon } from '@/types/models/Pokemon'
import classNames from 'classnames'
import PokeBallSvg from '@public/pokeball.svg'

export type PokemonCardProps = {
  pkmn: IPokemon
}

export default function PokemonCard({ pkmn }: PokemonCardProps) {
  const [isActive, setActive] = useState(false)

  return (
    <div
      className={classNames(styles['pokemon-card'], isActive && styles.active)}
      onClick={() => setActive(!isActive)}
    >
      <div className={styles.inner}>
        <PokeBallSvg className={styles.pokeball} />
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
        {/* Name */}
        <span className="capital"> {pkmn.name}</span>
      </div>
    </div>
  )
}
