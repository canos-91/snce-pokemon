import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function useAuthGuard() {
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (!user) router.push('/home')
  }, [])
}
