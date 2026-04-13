import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CursorBubble from '../components/CursorBubble'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CursorBubble />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
