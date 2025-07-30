import { useContext } from 'react'
import { AuthContext } from '../../authentication/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Keychain from 'react-native-keychain'

const useUserData = () => {
    const { setUserId, setUsername } = useContext(AuthContext)

    const persistUserData = async ({ user_id, username }) => {
        // TODO: Add in access and refresh tokens, token: token
        await Keychain.setGenericPassword('auth', JSON.stringify({ userId: user_id }))
        await AsyncStorage.setItem('username', username.toString())
        setUserId(user_id.toString())
        setUsername(username.toString())
    }

    return persistUserData
}

export default useUserData