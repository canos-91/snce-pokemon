/* eslint-disable @typescript-eslint/no-empty-function */
import { TeamWithRelations, TrainerWithTeams } from '@/types/models'
import { createContext, useState, useContext, ReactNode, useMemo, useCallback } from 'react'

type TUserContext = {
  user: TrainerWithTeams | null
  team: TeamWithRelations | null
  trainers: TrainerWithTeams[]
  setTrainer: (trainer: TrainerWithTeams) => void
  setTrainersList: (trainers: TrainerWithTeams[]) => void
  setUserTeam: (team: TeamWithRelations) => void
}

type UserContextProps = {
  children: ReactNode
}

const userContextDefault: TUserContext = {
  user: null,
  team: null,
  trainers: [],
  setTrainer: () => {},
  setTrainersList: () => {},
  setUserTeam: () => {},
}

const UserContext = createContext<TUserContext>(userContextDefault)

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }: UserContextProps) {
  const [user, setUser] = useState<TrainerWithTeams | null>(null)
  const [team, setTeam] = useState<TeamWithRelations | null>(null)
  const [trainers, setTrainers] = useState<TrainerWithTeams[]>([])

  const setTrainer = useCallback((trainer: TrainerWithTeams) => {
    setUser(trainer)
  }, [])

  const setUserTeam = useCallback((team: TeamWithRelations) => {
    setTeam(team)
  }, [])

  const setTrainersList = useCallback((trainers: TrainerWithTeams[]) => {
    setTrainers([...trainers])
  }, [])

  const contextValue = useMemo(
    (): TUserContext => ({
      user,
      team,
      trainers,
      setTrainer,
      setTrainersList,
      setUserTeam,
    }),
    [team, user, setTrainer, setTrainersList, setUserTeam, trainers]
  )
  return (
    <>
      <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    </>
  )
}
