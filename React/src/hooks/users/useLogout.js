import { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../../authentication/AuthContext'

const useLogout = () => {
    const { setIsLoggedIn } = useContext(AuthContext)
    const logout = async () => {
        await AsyncStorage.removeItem('userToken')
        setIsLoggedIn(false)
    }

    return logout
}

export default useLogout