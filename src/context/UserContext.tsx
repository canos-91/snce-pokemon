import type { PokemonWithRelations, TeamWithRelations, TrainerWithTeams } from '@/types/models'
import { createContext, useState, useContext, ReactNode, useMemo, useCallback } from 'react'

type TUserContext = {
  trainer: TrainerWithTeams | null
  currentTeam: TeamWithRelations | null
  teamPokemons: PokemonWithRelations[]
  trainers: TrainerWithTeams[]
  setTeamPokemons: (pokemons: PokemonWithRelations[]) => void
  setCurrentTrainer: (trainer: TrainerWithTeams) => void
  setCurrentTrainersList: (trainers: TrainerWithTeams[]) => void
  setCurrentTeam: (team: TeamWithRelations | null) => void
}

type UserContextProps = {
  children: ReactNode
}

const userContextDefault: TUserContext = {
  trainer: null,
  trainers: [],
  currentTeam: null,
  teamPokemons: [],
  setCurrentTeam: () => null,
  setCurrentTrainer: () => null,
  setCurrentTrainersList: () => [],
  setTeamPokemons: () => [],
}

const UserContext = createContext<TUserContext>(userContextDefault)

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }: UserContextProps) {
  const [trainer, setUser] = useState<TrainerWithTeams | null>(null)
  const [trainers, setCurrentTrainers] = useState<TrainerWithTeams[]>([])
  const [currentTeam, setTeam] = useState<TeamWithRelations | null>(null)
  const [teamPokemons, setPokemons] = useState<PokemonWithRelations[]>([])

  const setCurrentTrainer = useCallback((trainer: TrainerWithTeams) => {
    setUser(trainer)
  }, [])

  const setCurrentTrainersList = useCallback((trainers: TrainerWithTeams[]) => {
    setCurrentTrainers([...trainers])
  }, [])

  const setCurrentTeam = useCallback((team: TeamWithRelations | null) => {
    setTeam(team)
  }, [])

  const setTeamPokemons = useCallback((pokemons: PokemonWithRelations[]) => {
    setPokemons([...pokemons])
  }, [])

  const contextValue = useMemo(
    (): TUserContext => ({
      trainer,
      currentTeam,
      teamPokemons,
      trainers,
      setTeamPokemons,
      setCurrentTrainer,
      setCurrentTrainersList,
      setCurrentTeam,
    }),
    [
      trainer,
      currentTeam,
      teamPokemons,
      trainers,
      setTeamPokemons,
      setCurrentTrainer,
      setCurrentTrainersList,
      setCurrentTeam,
    ]
  )
  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}
