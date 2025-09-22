import { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Keychain from 'react-native-keychain'

import LogoutHelper from '../hooks/users/LogoutHelper'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [ username, setUsername ] = useState(null)
  const [ isLoggedIn, setIsLoggedIn ] = useState(null)
  const [ savedRecipeList, setSavedRecipeList ] = useState([])

  const logout = async () => {
    await LogoutHelper({setUsername, setIsLoggedIn, setSavedRecipeList})
  }

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const creds = await Keychain.getGenericPassword()
        const storedUsername = await AsyncStorage.getItem('username')
        if (creds && creds.username === 'auth' && storedUsername) {
          setUsername(storedUsername)
          setIsLoggedIn(true)
          const storedRecipeIds = await AsyncStorage.getItem('savedRecipeIds')
          if (storedRecipeIds) {
            setSavedRecipeList(storedRecipeIds)
          }
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
      username,
      setUsername,
      isLoggedIn,
      setIsLoggedIn,
      savedRecipeList,
      setSavedRecipeList
    }}>
      {children}
    </AuthContext.Provider>
  )
}