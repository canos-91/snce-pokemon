import { useMemo, useState } from 'react'
import Image from 'next/image'
import styles from './PokemonCard.module.scss'
import classNames from 'classnames'
import PokeBallSvg from '@public/pokeball.svg'
import { Badge } from '@/components/atoms'
import { ApiPokemon } from '@/services/pokeApiService'
import { Pokemon } from '@prisma/client'

export interface CardPokemon extends Pokemon {
  types: { type: { name: string; url: string } }[]
  abilities: { ability: { name: string; url: string } }[]
}

export type PokemonCardProps = {
  pkmn?: ApiPokemon | Pokemon
  active?: boolean
}

export default function PokemonCard({ pkmn, active = false }: PokemonCardProps) {
  const [isActive, setActive] = useState(false)
  const pokemon = useMemo((): CardPokemon | undefined => {
    if (pkmn) {
      if ('spriteURL' in pkmn) {
        return pkmn as CardPokemon
      } else {
        const { id, name, base_experience, sprites, types, abilities } = pkmn
        return {
          id,
          baseXp: base_experience,
          name,
          spriteURL: sprites.front_default,
          types,
          abilities,
        }
      }
    }
  }, [pkmn])

  return (
    <div
      className={classNames(styles['pokemon-card'], (isActive || active) && styles.active)}
      onClick={() => pkmn && !active && setActive(!isActive)}
    >
      <PokeBallSvg className={styles.pokeball} />
      {pokemon && (
        <div className={styles.inner}>
          {/* Sprite */}
          <div className={styles.sprite}>
            <Image
              src={pokemon.spriteURL}
              alt={pokemon.name}
              fill
              // onLoadingComplete={() => setLoaded(true)}
              priority
            ></Image>
          </div>

          {/* Types */}
          <div className={classNames(styles.badges)}>
            {pokemon.types?.map((t: { type: { name: string } }, index: number) => (
              <Badge key={index} label={t.type.name} color={t.type.name} />
            ))}
          </div>

          {/* Name */}
          <h3 className={classNames(styles['pkmn-name'], 'capital')}>{pokemon.name}</h3>
        </div>
      )}
    </div>
  )
}
