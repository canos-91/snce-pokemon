import styles from './Header.module.scss'
import PkmnLogo from '@public/assets/svg/pkmn_logo.svg'

export default function Header() {
  return (
    <header className={styles.header}>
      <PkmnLogo className={styles.logo} alt="logo" />
    </header>
  )
}
