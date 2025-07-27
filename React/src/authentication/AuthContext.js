import { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [ userId, setUserId ] = useState(null)
  const [ username, setUsername ] = useState(null)
  const [ isLoggedIn, setIsLoggedIn ] = useState(null)

  useEffect(() => {
    const checkLogin = async () => {
        const token = await AsyncStorage.getItem('userToken')
        const storedUserId = await AsyncStorage.getItem('userId')
        const storedUsername = await AsyncStorage.getItem('username')
        setIsLoggedIn(!!token)
        if (storedUserId) {
          setUserId(storedUserId)
        }
        if (storedUsername) {
          setUsername(storedUsername)
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