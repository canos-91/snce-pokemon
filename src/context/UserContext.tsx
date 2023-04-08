import type { TrainerWithTeams } from '@/types/models'
import { createContext, useState, useContext, ReactNode, useMemo, useCallback } from 'react'

type TUserContext = {
  trainer: TrainerWithTeams | null
  trainers: TrainerWithTeams[]
  setCurrentTrainer: (trainer: TrainerWithTeams) => void
  setCurrentTrainersList: (trainers: TrainerWithTeams[]) => void
}

type UserContextProps = {
  children: ReactNode
}

const userContextDefault: TUserContext = {
  trainer: null,
  trainers: [],
  setCurrentTrainer: () => null,
  setCurrentTrainersList: () => [],
}

const UserContext = createContext<TUserContext>(userContextDefault)

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }: UserContextProps) {
  const [trainer, setUser] = useState<TrainerWithTeams | null>(null)
  const [trainers, setCurrentTrainers] = useState<TrainerWithTeams[]>([])

  const setCurrentTrainer = useCallback((trainer: TrainerWithTeams) => {
    setUser(trainer)
  }, [])

  const setCurrentTrainersList = useCallback((trainers: TrainerWithTeams[]) => {
    setCurrentTrainers([...trainers])
  }, [])

  const contextValue = useMemo(
    (): TUserContext => ({
      trainer,
      trainers,
      setCurrentTrainer,
      setCurrentTrainersList,
    }),
    [trainer, trainers, setCurrentTrainer, setCurrentTrainersList]
  )

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}
