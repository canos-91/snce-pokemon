import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './PokemonCard.module.scss'
import { Pokemon } from '@/types/models/Pokemon'
import classNames from 'classnames'
import PokeBallSvg from '@public/pokeball.svg'
import { Badge } from '@/components/atoms'

export type PokemonCardProps = {
  pkmn?: Pokemon
  active?: boolean
}

export default function PokemonCard({ pkmn, active = false }: PokemonCardProps) {
  const [isActive, setActive] = useState(false)

  return (
    <div
      className={classNames(styles['pokemon-card'], (isActive || active) && styles.active)}
      onClick={() => pkmn && !active && setActive(!isActive)}
    >
      <PokeBallSvg className={styles.pokeball} />
      {pkmn && (
        <div className={styles.inner}>
          {/* Sprite */}
          {pkmn.sprite && (
            <div className={styles.sprite}>
              <Image
                src={pkmn.sprite}
                alt={pkmn.name}
                fill
                // onLoadingComplete={() => setLoaded(true)}
                priority
              ></Image>
            </div>
          )}

          {/* Types */}
          <div className={classNames(styles.badges)}>
            {pkmn.types?.map((type, index) => (
              <Badge key={index} label={type} color={type} />
            ))}
          </div>

          {/* Name */}
          <h3 className={classNames(styles['pkmn-name'], 'capital')}>{pkmn.name}</h3>
        </div>
      )}
    </div>
  )
}
