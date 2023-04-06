import styles from './AppLayout.module.scss'
import classNames from 'classnames'
import { Rubik } from 'next/font/google'
import { Header, Navbar } from '@/components/layout'
import PokeBallSvg from '@public/assets/svg/pokeball.svg'

const rubik = Rubik({ subsets: ['latin'] })

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={classNames(styles.layout, rubik.className)}>
      <Header />
      <div className={styles.view}>
        <Navbar />
        <PokeBallSvg className={styles.pokeball} />
        {children}
      </div>
    </div>
  )
}
