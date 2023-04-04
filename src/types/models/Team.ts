import { Pokemon } from '@/types/models/Pokemon'

export interface ITeam {
  readonly id?: number
  trainerId: number
  name: string
  pokemons: Pokemon[]
}
