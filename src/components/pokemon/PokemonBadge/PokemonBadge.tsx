import { useState } from 'react'
import Image from 'next/image'
import styles from './PokemonBadge.module.scss'
import classNames from 'classnames'
import PokeBallSvg from '@public/assets/svg/pokeball.svg'
import { Badge } from '@/components/atoms'
import type { PokemonWithRelations } from '@/types/models'

export type PokemonBadgeProps = {
  pkmn?: PokemonWithRelations
  active?: boolean
}

export default function PokemonBadge({ pkmn, active = false }: PokemonBadgeProps) {
  const [isActive, setActive] = useState(false)

  return (
    <div className={classNames(styles['pokemon-badge'], (isActive || active) && styles.active)}>
      {/* onClick={() => pkmn && !active && setActive(!isActive)} */}
      <div className={styles.pokeball}>
        <PokeBallSvg />
      </div>
      {pkmn && (
        <>
          {/* Sprite */}
          <div className={styles.sprite}>
            <Image
              src={pkmn.spriteURL}
              alt={pkmn.name}
              width={64}
              height={64}
              // onLoadingComplete={() => setLoaded(true)}
              priority
            ></Image>
          </div>
          {/* Types */}
          <div className={classNames(styles.types)}>
            {pkmn.types?.map((t, index) => (
              <Badge key={index} label={t.type.name} color={t.type.name} />
            ))}
          </div>

          <div className={classNames(styles.info)}>
            {/* Abilities */}
            <div className={styles.abilities}>
              {pkmn.abilities?.map((a, index) => (
                <small key={index}>{a.ability.name}</small>
              ))}
            </div>

            {/* Name */}
            <h4 className={classNames(styles['pkmn-name'])}>{pkmn.name}</h4>
          </div>
        </>
      )}
    </div>
  )
}
