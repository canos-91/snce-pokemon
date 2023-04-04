import { Header, Navbar } from '@/components/layout'
import styles from './AppLayout.module.scss'
import { Rubik } from 'next/font/google'
import classNames from 'classnames'

const rubik = Rubik({ subsets: ['latin'] })

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={classNames(styles.layout, rubik.className)}>
      <Header />
      <Navbar />
      {children}
    </div>
  )
}
