import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type useAuthGuardProps = { team?: boolean } | undefined

export function useAuthGuard(checks: useAuthGuardProps) {
  const router = useRouter()
  const { trainer, currentTeam } = useUser()

  useEffect(() => {
    if (!trainer || (checks?.team && !currentTeam)) router.push('/home')
  }, [])
}
