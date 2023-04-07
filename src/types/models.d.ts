import { Pokemon, Team, Trainer, Ability, Type, TeamPokemons } from '@prisma/client'

export interface TeamPokemonsWithRelations extends TeamPokemons {
  pokemon: PokemonWithRelations
}

export interface TeamPokemonsWithTeam extends TeamPokemons {
  team: TeamWithRelations
}

export interface TrainerWithTeams extends Trainer {
  teams: Team[]
}

export interface TeamWithRelations extends Team {
  trainer: Trainer
  pokemons: TeamPokemonsWithRelations[]
}

export interface PokemonWithRelations extends Pokemon {
  abilities: { ability: Ability }[]
  types: {
    type: Type
  }[]
}

export interface ApiPokemon {
  id: number
  name: string
  abilities: { ability: { name: string; url: string } }[]
  types: {
    type: { name: string; url: string }
  }[]
  sprites: { front_default: string }
  base_experience: number
}
