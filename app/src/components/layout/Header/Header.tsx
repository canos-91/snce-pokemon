import Image from 'next/image'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="logo">
        <Image src="/pkmn_logo.svg" alt="logo" fill />
      </div>
    </header>
  )
}
