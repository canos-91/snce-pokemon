export interface IPokemon {
  name: string
  types: IPokemonType[]
  sprite: string
}

export interface IPokemonType {
  slot: number
  type: { name: string; url: string }
}
