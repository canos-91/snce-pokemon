import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type UseAuthGuardProps = { team?: boolean } | undefined

export const useAuthGuard = (checks?: UseAuthGuardProps) => {
  const router = useRouter()
  const { trainer, currentTeam } = useUser()

  useEffect(() => {
    if (!trainer || (checks?.team && !currentTeam)) router.push('/home')
  }, [checks?.team, currentTeam, router, trainer])
}
