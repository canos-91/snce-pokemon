import styles from './Navbar.module.scss'
import Link from 'next/link'
import { useUser } from '@/context/UserContext'
import classNames from 'classnames'
import { useRouter } from 'next/router'

interface NavbarLink {
  icon: string
  label: string
  src: string
  aliases?: string[]
}

export default function Navbar() {
  const router = useRouter()
  const { trainer } = useUser()

  const navbarLinks: NavbarLink[] = [
    {
      icon: '',
      label: 'Home',
      src: '/',
      aliases: ['/home'],
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
    <nav className={classNames(styles.navbar, 'container')}>
      <ul>
        {navbarLinks.map((link, index) => (
          <li
            className={classNames(
              !trainer && styles.disabled,
              (link.aliases?.includes(router.pathname) || router.pathname == link.src) && styles.active
            )}
            key={index}
          >
            <Link href={link.src}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
