import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>{`Pokémon Trainer- Gotta catch 'em all!`}</title>
        <meta
          name="description"
          content="Become the best Pokémon trainer in the world!"
        />
      </Head>
    </>
  )
}
