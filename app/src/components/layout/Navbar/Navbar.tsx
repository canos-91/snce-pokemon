import styles from './Navbar.module.scss'
import Link from 'next/link'

interface NavbarLink {
  icon: string
  label: string
  src: string
}

export default function Navbar() {
  const navbarLinks: NavbarLink[] = [
    {
      icon: '',
      label: 'Home',
      src: '/',
    },
    {
      icon: '',
      label: 'New team',
      src: '/team/create',
    },
    {
      icon: '',
      label: 'Your teams',
      src: '/team/create',
    },
  ]
  return (
    <nav className={styles.navbar}>
      <ul>
        {navbarLinks.map((link, index) => (
          <li key={index}>
            <Link href={link.src}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
