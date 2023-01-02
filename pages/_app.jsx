import '../styles/main.scss'
import { Provider } from 'react-redux'
import store from '@store'
import ToastContainer from '@components/ToastContainer'

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <Component {...pageProps} />
    <ToastContainer/>
  </Provider>
}

export default MyApp
