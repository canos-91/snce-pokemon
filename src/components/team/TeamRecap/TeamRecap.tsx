import styles from './TeamRecap.module.scss'
import classNames from 'classnames'
import Image from 'next/image'
import type { PokemonWithRelations } from '@/types/models'
import { Badge } from '@/components/atoms'

export interface ITeamRecap {
  name: string
  createdAt: Date
  baseXpSum: number
  pokemons: PokemonWithRelations[]
  types: string[]
}

interface TeamRecapProps {
  team: ITeamRecap
}

const TeamRecap = ({ team }: TeamRecapProps) => {
  return (
    <section className={classNames(styles['team-recap'], 'container')}>
      <ul>
        {/* Pokemons */}
        <li>
          <h4>Pokémons</h4>
          <div className={styles.pokemons}>
            {team.pokemons.map((pkmn, i) => (
              <div className={classNames('glass-box', styles.pokemon)} key={i}>
                {/* Sprite */}
                <Image src={pkmn.spriteURL} alt={pkmn.name} width={64} height={64} priority />

                {/* Name */}
                <h4 className={classNames(styles['pkmn-name'], 'capital')}>{pkmn.name}</h4>
              </div>
            ))}
          </div>
        </li>

        {/* Base XP */}
        <li>
          <h4>Base XP total: {team.baseXpSum} pts</h4>
        </li>

        {/* Types */}
        <li>
          <h4>Types:</h4>
          <div className={classNames(styles.types)}>
            {team.types?.map((type, index) => (
              <Badge key={index} label={type} color={type} />
            ))}
          </div>
        </li>
      </ul>
    </section>
  )
}

export default TeamRecap
