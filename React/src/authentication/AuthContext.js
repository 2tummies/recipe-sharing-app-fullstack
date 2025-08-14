import { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Keychain from 'react-native-keychain'

import LogoutHelper from '../hooks/users/LogoutHelper'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [ userId, setUserId ] = useState(null)
  const [ username, setUsername ] = useState(null)
  const [ isLoggedIn, setIsLoggedIn ] = useState(null)

  const logout = async () => {
    await LogoutHelper({setUserId, setUsername, setIsLoggedIn})
  }

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const creds = await Keychain.getGenericPassword()
        const storedUsername = await AsyncStorage.getItem('username')
        if (creds && creds.username === 'auth' && storedUsername) {
          setUsername(storedUsername)
          setIsLoggedIn(true)
          const parsed = JSON.parse(creds.password)
          setUserId(parsed.userId)
        } else {
          await logout()
        }
      } catch(e) {
        console.warn('Error in AuthContext 1: ', e)
        await logout()
      }
    }
    try {
      checkLogin()
    } catch(e) {
      console.warn('Error in AuthContext 2:', e)
    }
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