/* eslint-disable @typescript-eslint/no-empty-function */
import { Trainer } from '@prisma/client'
import { createContext, useState, useContext, ReactNode } from 'react'

type TUserContext = {
  user: Trainer | null
  setTrainer: (trainer: Trainer) => void
  setTrainersList: (trainers: Trainer[]) => void
  trainers: Trainer[]
}

type UserContextProps = {
  children: ReactNode
}

const userContextDefault: TUserContext = {
  user: null,
  setTrainer: () => {},
  setTrainersList: () => {},
  trainers: [],
}

const UserContext = createContext<TUserContext>(userContextDefault)

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }: UserContextProps) {
  const [user, setUser] = useState<Trainer | null>(null)
  const [trainers, setTrainers] = useState<Trainer[]>([])

  const setTrainer = (trainer: Trainer) => {
    setUser(trainer)
  }

  const setTrainersList = (trainers: Trainer[]) => {
    setTrainers([...trainers])
  }

  const value: TUserContext = {
    user,
    setTrainer,
    setTrainersList,
    trainers,
  }
  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  )
}
