import { Header, Navbar } from '@/components/layout'
import styles from './AppLayout.module.scss'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <Navbar />
      <main className={styles.pages}>{children}</main>
    </div>
  )
}
