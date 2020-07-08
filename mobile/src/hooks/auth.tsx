import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'

interface AuthState {
  token: string
  user: object
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: object
  loading: boolean
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [user, token] = await AsyncStorage.multiGet([
        '@GoBarber:user',
        '@GoBarber:token',
      ])

      if (user[1] && token[1]) {
        setData({ user: JSON.parse(user[1]), token: token[1] })
      }

      setLoading(false)
    }

    loadStorageData()
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    await AsyncStorage.multiSet([
      ['@GoBarber:user', JSON.stringify(user)],
      ['@GoBarber:token', token],
    ])

    setData({ token, user })
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:user', '@GoBarber:token'])

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
