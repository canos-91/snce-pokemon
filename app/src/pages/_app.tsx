import '@/styles/global.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div id="app-wrapper">
      <Component className={'app-wrapper'} {...pageProps} />
    </div>
  )
}
