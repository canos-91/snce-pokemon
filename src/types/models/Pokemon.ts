import type { PokemonType } from '@/types/models/Type'

export interface Pokemon {
  readonly id: number
  name: string
  baseXp: number
  abilityId: number
  abilities: string
  types: PokemonType[]
  sprite: string
}
