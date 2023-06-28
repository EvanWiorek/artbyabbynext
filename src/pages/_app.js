import '../styles/globals.css'
import '../styles/loaders.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-quill/dist/quill.snow.css'
import { StoreProvider } from '../utils/Store'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <PayPalScriptProvider deferLoading={true}>
        <Component {...pageProps} />
        <ToastContainer />
      </PayPalScriptProvider>
    </StoreProvider>
  )
}
