import { useMemo, useState } from 'react'
import Image from 'next/image'
import styles from './PokemonCard.module.scss'
import classNames from 'classnames'
import PokeBallSvg from '@public/assets/svg/pokeball.svg'
import { Badge } from '@/components/atoms'
import type { ApiPokemon, PokemonWithRelations } from '@/types/models'
import { getLastIntFromURL } from '@/utils/string'

export type PokemonCardProps = {
  pkmn?: ApiPokemon | PokemonWithRelations
  active?: boolean
}

const PokemonCard = ({ pkmn, active = false }: PokemonCardProps) => {
  const [isActive, setActive] = useState(false)

  /**
   * Formats Pokémon retrieved from Api as PokemonWithRelations
   */
  const formatApiPkmn = (pkmn: ApiPokemon): PokemonWithRelations => {
    const { base_experience, sprites, types, abilities, ...rest } = pkmn

    return {
      ...rest,
      baseXp: base_experience,
      spriteURL: sprites.front_default,
      types: types.map((t) => ({ type: { id: getLastIntFromURL(t.type.url), name: t.type.name } })),
      abilities: abilities.map((a) => ({
        ability: { id: getLastIntFromURL(a.ability.url), name: a.ability.name },
      })),
    }
  }

  /**
   * Formatted Pokémon
   */
  const cardPkmn = useMemo((): PokemonWithRelations | undefined => {
    return pkmn && 'sprites' in pkmn ? formatApiPkmn(pkmn) : pkmn
  }, [pkmn])

  return (
    <div
      className={classNames(styles['pokemon-card'], (isActive || active) && styles.active)}
      onClick={() => pkmn && !active && setActive(!isActive)}
    >
      <PokeBallSvg className={styles.pokeball} />
      {cardPkmn && (
        <div className={styles.inner}>
          {/* Sprite */}
          <div className={styles.sprite}>
            <Image src={cardPkmn.spriteURL} alt={cardPkmn.name} width={96} height={96} priority></Image>
          </div>

          {/* Types */}
          <div className={classNames(styles.types)}>
            {cardPkmn.types?.map((t, index) => (
              <Badge key={index} label={t.type.name} color={t.type.name} />
            ))}
          </div>

          {/* Abilities */}
          <div className={classNames(styles.abilities)}>
            {cardPkmn.abilities?.map((a, index) => (
              <h5 key={index}>{a.ability.name}</h5>
            ))}
          </div>

          {/* Name */}
          <h3 className={classNames(styles['pkmn-name'], 'capital')}>{cardPkmn.name}</h3>
        </div>
      )}
    </div>
  )
}

export default PokemonCard
