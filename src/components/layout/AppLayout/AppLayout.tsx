import styles from './AppLayout.module.scss'
import classNames from 'classnames'
import { Rubik } from 'next/font/google'
import { Header } from '@/components/layout'
import PokeBallSvg from '@public/assets/svg/pokeball.svg'
import type { ReactNode } from 'react'

const rubik = Rubik({ subsets: ['latin'] })

interface AppLayoutProps {
  children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className={classNames(styles['app-layout'], rubik.className)}>
      <Header />
      <div className={styles.view}>
        <PokeBallSvg className={styles.pokeball} />
        {children}
      </div>
    </div>
  )
}

export default AppLayout
