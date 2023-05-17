import {
  SignInRequestData,
  User,
  recoverUser,
  signInRequest,
} from '@/services/auth'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { useRouter } from 'next/router'
import { api } from '@/services/api'

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  signIn: (data: SignInRequestData) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const { push } = useRouter()

  useEffect(() => {
    const { 'nextauth-test.token': token } = parseCookies()

    if (token) {
      recoverUser(token).then((user) => setUser(user))

      api.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  }, [])

  async function signIn({ email, password }: SignInRequestData) {
    const { user, token } = await signInRequest({ email, password })

    setCookie(undefined, 'nextauth-test.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setUser(user)

    push('/dashboard')
  }

  function signOut() {
    destroyCookie(undefined, 'nextauth-test.token')

    api.defaults.headers.common.Authorization = undefined

    setUser(null)

    push('/')
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
