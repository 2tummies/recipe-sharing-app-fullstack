import { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(null)

  useEffect(() => {
    const checkLogin = async () => {
        const token = await AsyncStorage.getItem('userToken')
        setIsLoggedIn(!!token)
    }
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
    </AuthContext.Provider>
  )
}