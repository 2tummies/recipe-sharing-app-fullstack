import { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Keychain from 'react-native-keychain'

import useLogout from '../hooks/users/UseLogout'

export const AuthContext = createContext()
const logout = useLogout()

export const AuthProvider = ({ children }) => {
  const [ userId, setUserId ] = useState(null)
  const [ username, setUsername ] = useState(null)
  const [ isLoggedIn, setIsLoggedIn ] = useState(null)

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const creds = await Keychain.getGenericPassword()
        const storedUsername = await AsyncStorage.getItem('username')
        if (creds && creds.username === 'auth') {
          setIsLoggedIn(true)
          const parsed = JSON.parse(creds.password)
          setUserId(parsed.userId)
        }
        if (storedUsername) {
          setUsername(storedUsername)
        }
      } catch(error) {
        console.warn('Failed to load auth data:', e)
        logout()
      }
    }
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider value={{
      userId, 
      setUserId,
      username,
      setUsername,
      isLoggedIn,
      setIsLoggedIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}