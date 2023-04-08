import { useState } from 'react'
import Image from 'next/image'
import styles from './PokemonBadge.module.scss'
import classNames from 'classnames'
import PokeBallSvg from '@public/assets/svg/pokeball.svg'
import { Badge } from '@/components/atoms'
import type { PokemonWithRelations } from '@/types/models'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { axiosClient } from '@/lib/apiClient'
import { TeamPokemonData } from '@/services/teamService'
import { useTeam } from '@/context/TeamContext'

export type PokemonBadgeProps = {
  pkmn: PokemonWithRelations
  idx: number
  active?: boolean
  deleteFromTeam?: boolean
}

const PokemonBadge = ({ pkmn, idx, deleteFromTeam = false, active = false }: PokemonBadgeProps) => {
  const { team, pokemons, setPokemons } = useTeam()
  const [isActive] = useState(false)

  /**
   * Remove Pokémon from team
   */
  const removePkmn = async () => {
    setPokemons(pokemons.filter((p, i) => i !== idx))

    if (team && deleteFromTeam) {
      await axiosClient.delete<TeamPokemonData>(`/api/team/pokemon/delete`, {
        data: {
          teamId: team.id,
          pokemonId: pkmn.id,
        },
      })
    }
  }

  return (
    <div className={classNames(styles['pokemon-badge'], (isActive || active) && styles.active)}>
      <FontAwesomeIcon className={styles.remove} icon={faTrash} style={{ fontSize: 16 }} onClick={() => removePkmn()} />
      <div className={styles.badge}>
        <div className={styles.pokeball}>
          <PokeBallSvg />
        </div>
        {pkmn && (
          <>
            {/* Sprite */}
            <div className={styles.sprite}>
              <Image src={pkmn.spriteURL} alt={pkmn.name} width={64} height={64} priority></Image>
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
    </div>
  )
}

export default PokemonBadge
