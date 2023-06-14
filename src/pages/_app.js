import '../styles/globals.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-quill/dist/quill.snow.css'
import { StoreProvider } from '../utils/Store'

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}
