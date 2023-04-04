import Head from 'next/head'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>{`Pokémon Trainer- Gotta catch 'em all!`}</title>
        <meta name="description" content="Become the best Pokémon trainer in the world!" />
      </Head>
    </>
  )
}
