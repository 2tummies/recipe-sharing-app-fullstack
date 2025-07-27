import { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../../authentication/AuthContext'

const useLogout = () => {
    const { setUserId, setUsername, setIsLoggedIn } = useContext(AuthContext)
    const logout = async () => {
        await AsyncStorage.removeItem('userToken')
        await AsyncStorage.removeItem('userId')
        await AsyncStorage.removeItem('username')
        setIsLoggedIn(false)
        setUserId(null)
        setUsername(null)
    }

    return logout
}

export default useLogout