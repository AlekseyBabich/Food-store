import '@/styles/globals.css'
import 'src/firebase'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from '../store/index'
import Layout from '@/components/layout/Layout'


export default function App({ Component, pageProps }) {
  return (
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <Layout>
          <Component { ...pageProps } />
        </Layout>
      </PersistGate>
    </Provider>
  )
}
