import { useState } from 'react'
import Image from 'next/image'
import styles from './PokemonBadge.module.scss'
import classNames from 'classnames'
import PokeBallSvg from '@public/assets/svg/pokeball.svg'
import { Badge } from '@/components/atoms'
import type { PokemonWithRelations } from '@/types/models'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUser } from '@/context/UserContext'
import { axiosClient } from '@/lib/apiClient'

export type PokemonBadgeProps = {
  pkmn: PokemonWithRelations
  idx: number
  active?: boolean
  deleteFromTeam?: boolean
}

export default function PokemonBadge({ pkmn, idx, deleteFromTeam = false, active = false }: PokemonBadgeProps) {
  const { currentTeam, teamPokemons, setTeamPokemons } = useUser()
  const [isActive, setActive] = useState(false)

  /**
   * Remove Pokémon from team
   */
  const removePkmn = async () => {
    setTeamPokemons(teamPokemons.filter((p, i) => i !== idx))

    if (currentTeam && deleteFromTeam) {
      await axiosClient.delete(`/api/team/pokemon/delete`, {
        data: {
          teamId: currentTeam.id,
          pokemonId: pkmn.id,
        },
      })
    }
  }

  return (
    <div className={classNames(styles['pokemon-badge'], (isActive || active) && styles.active)}>
      <FontAwesomeIcon className={styles.remove} icon={faTrash} style={{ fontSize: 16 }} onClick={() => removePkmn()} />
      <div className={styles.badge}>
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
    </div>
  )
}
