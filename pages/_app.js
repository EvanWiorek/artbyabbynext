import '@/styles/globals.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Context from '@/context/context'

export default function App({ Component, pageProps }) {
  return (
  <Context>
    <Component {...pageProps} />
  </Context>
  )
}
