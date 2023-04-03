import { useState } from 'react'
import Image from 'next/image'
import style from './PokemonCard.module.scss'

export type PokemonCardProps = {
  pkmnName: string
  sprite: string
}

export default function PokemonCard({ pkmnName, sprite }: PokemonCardProps) {
  const [loaded, setLoaded] = useState(true)

  return (
    <>
      {loaded && (
        <div>
          <Image
            src={sprite}
            alt={pkmnName}
            width={100}
            height={100}
            onLoadingComplete={() => setLoaded(true)}
            priority
          ></Image>
          <h1 className={style.title}> {pkmnName}</h1>
        </div>
      )}
    </>
  )
}
