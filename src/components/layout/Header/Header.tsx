import { useUser } from '@/context/UserContext'
import styles from './Header.module.scss'
import PkmnLogo from '@public/assets/svg/pkmn_logo.svg'
import { GlassBadge } from '@/components/glass'
import { Navbar } from '@/components/layout'
import { useTeam } from '@/context/TeamContext'

const Header = () => {
  const { trainer } = useUser()
  const { team, pokemons } = useTeam()

  return (
    <header className={styles.header}>
      <Navbar />
      <PkmnLogo className={styles.logo} alt="logo" />
      <div className={styles.badges}>
        {/* Team */}
        {team && (
          <GlassBadge
            type="team"
            transparent
            attributes={{ title: team.name, subtitle: `${pokemons?.length} Pokémons` }}
            clickable={false}
          />
        )}
        {/* Trainer */}
        {trainer && (
          <GlassBadge
            type="trainer"
            transparent
            attributes={{ title: trainer.username, subtitle: `${trainer.teams?.length || '0'} teams` }}
            clickable={false}
          />
        )}
      </div>
    </header>
  )
}

export default Header
