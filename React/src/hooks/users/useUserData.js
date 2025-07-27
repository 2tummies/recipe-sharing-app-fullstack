import { useContext } from 'react'
import { AuthContext } from '../../authentication/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useUserData = () => {
    const { setUserId, setUsername } = useContext(AuthContext)

    const persistUserData = async ({ user_id, username }) => {
        await AsyncStorage.setItem('userId', user_id.toString())
        await AsyncStorage.setItem('username', username.toString())
        setUserId(user_id.toString())
        setUsername(username.toString())
    }

    return persistUserData
}

export default useUserData