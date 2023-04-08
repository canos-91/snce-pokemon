import { useTeam } from '@/context/TeamContext'
import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type UseAuthGuardProps = { team?: boolean } | undefined

export const useAuthGuard = (checks?: UseAuthGuardProps) => {
  const router = useRouter()
  const { trainer } = useUser()
  const { team, setTeam } = useTeam()

  useEffect(() => {
    if (!trainer || (checks?.team && !team)) router.push('/home')
  }, [checks, team, router, trainer, setTeam])
}
