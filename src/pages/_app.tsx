import { AuthProvider } from '@/contexts/AuthContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        theme="colored"
        hideProgressBar
        pauseOnFocusLoss={false}
        closeOnClick
      />
      <Component {...pageProps} />
    </AuthProvider>
  )
}
