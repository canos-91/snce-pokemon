import type { PokemonWithRelations, TeamWithRelations } from '@/types/models'
import { createContext, useState, useContext, ReactNode, useMemo, useCallback } from 'react'
import { useUser } from './UserContext'

type TTeamContext = {
  team: TeamWithRelations | null
  pokemons: PokemonWithRelations[]
  setPokemons: (pokemons: PokemonWithRelations[]) => void
  setTeam: (team: TeamWithRelations | null) => void
  hasChanges: boolean
}

type TeamContextProps = {
  children: ReactNode
}

const teamContextDefault: TTeamContext = {
  team: null,
  pokemons: [],
  setTeam: () => null,
  setPokemons: () => [],
  hasChanges: false,
}

const TeamContext = createContext<TTeamContext>(teamContextDefault)

export function useTeam() {
  return useContext(TeamContext)
}

export function TeamProvider({ children }: TeamContextProps) {
  const { trainer } = useUser()
  const [team, setTeamState] = useState<TeamWithRelations | null>(null)
  const [pokemons, setPokemonsState] = useState<PokemonWithRelations[]>([])

  const setTeam = useCallback((team: TeamWithRelations | null) => {
    setTeamState(team)
  }, [])

  const setPokemons = useCallback((pokemons: PokemonWithRelations[]) => {
    setPokemonsState([...pokemons])
  }, [])

  /**
   * Returns true if any pokemon are added or removed
   */
  const hasChanges: boolean = useMemo(() => {
    const savedTeam = trainer?.teams?.find((t) => t.id === team?.id)
    const savedIds = savedTeam?.pokemons.map((p) => p.pokemon.id).sort()
    const teamIds = pokemons.map((p) => p.id).sort()
    return JSON.stringify(savedIds) !== JSON.stringify(teamIds)
  }, [team?.id, pokemons, trainer?.teams])

  const contextValue = useMemo(
    (): TTeamContext => ({
      team,
      pokemons,
      setTeam,
      setPokemons,
      hasChanges,
    }),
    [team, pokemons, setTeam, setPokemons, hasChanges]
  )

  return <TeamContext.Provider value={contextValue}>{children}</TeamContext.Provider>
}
