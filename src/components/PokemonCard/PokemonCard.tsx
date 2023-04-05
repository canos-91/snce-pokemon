import { useMemo, useState } from 'react'
import Image from 'next/image'
import styles from './PokemonCard.module.scss'
import classNames from 'classnames'
import PokeBallSvg from '@public/pokeball.svg'
import { Badge } from '@/components/atoms'
import { ApiPokemon } from '@/services/pokeApiService'

export type PokemonCardProps = {
  // pkmn?: ApiPokemon | Pokemon
  pkmn?: ApiPokemon
  active?: boolean
}

export default function PokemonCard({ pkmn, active = false }: PokemonCardProps) {
  const [isActive, setActive] = useState(false)
  const pokemon = useMemo(() => {
    if (pkmn) {
      if ('spriteURL' in pkmn) {
        return pkmn
      } else {
        return pkmn
      }
    }
  }, [pkmn])
  console.log(pokemon)

  return (
    <div
      className={classNames(styles['pokemon-card'], (isActive || active) && styles.active)}
      onClick={() => pkmn && !active && setActive(!isActive)}
    >
      <PokeBallSvg className={styles.pokeball} />
      {pkmn && (
        <div className={styles.inner}>
          {/* Sprite */}
          {pkmn.sprites.front_default && (
            <div className={styles.sprite}>
              <Image
                src={pkmn.sprites.front_default}
                alt={pkmn.name}
                fill
                // onLoadingComplete={() => setLoaded(true)}
                priority
              ></Image>
            </div>
          )}

          {/* Types */}
          <div className={classNames(styles.badges)}>
            {pkmn.types?.map((t: { type: { name: string } }, index: number) => (
              <Badge key={index} label={t.type.name} color={t.type.name} />
            ))}
          </div>

          {/* Name */}
          <h3 className={classNames(styles['pkmn-name'], 'capital')}>{pkmn.name}</h3>
        </div>
      )}
    </div>
  )
}
