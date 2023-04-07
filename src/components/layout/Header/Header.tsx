import { useUser } from '@/context/UserContext'
import styles from './Header.module.scss'
import PkmnLogo from '@public/assets/svg/pkmn_logo.svg'
import { GlassBadge } from '@/components/glass'
import Navbar from '../Navbar/Navbar'

export default function Header() {
  const { trainer, currentTeam, teamPokemons } = useUser()

  return (
    <header className={styles.header}>
      <Navbar />
      <PkmnLogo className={styles.logo} alt="logo" />
      <div className={styles.badges}>
        {/* Team */}
        {currentTeam && (
          <GlassBadge
            type="team"
            transparent
            attributes={{ title: currentTeam.name, subtitle: `${teamPokemons?.length} Pokémons` }}
            clickable={false}
          />
        )}
        {/* Trainer */}
        {trainer && (
          <GlassBadge
            type="trainer"
            transparent
            attributes={{ title: trainer.username, subtitle: `${trainer.teams?.length} teams` }}
            clickable={false}
          />
        )}
      </div>
    </header>
  )
}
