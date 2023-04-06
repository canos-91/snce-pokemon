import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type useAuthGuardProps = { team?: boolean } | undefined

export function useAuthGuard(checks: useAuthGuardProps) {
  const router = useRouter()
  const { user, team } = useUser()

  useEffect(() => {
    if (!user) router.push('/home')
    if (checks?.team && !team) router.push('/team/create')
  }, [])
}
