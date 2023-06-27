import '../styles/globals.css'
import '../styles/loaders.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-quill/dist/quill.snow.css'
import { StoreProvider } from '../utils/Store'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </StoreProvider>
  )
}
