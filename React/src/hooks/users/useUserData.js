import { useContext } from 'react'
import { AuthContext } from '../../authentication/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Keychain from 'react-native-keychain'

const useUserData = () => {
    const { setUserId, setUsername, setIsLoggedIn, setSavedRecipeList } = useContext(AuthContext)

    const persistUserData = async (data) => {
        try {
            await Keychain.setGenericPassword('auth', JSON.stringify({ userId: data.user_id, access: data.access, refresh: data.refresh }))
            await AsyncStorage.setItem('username', data.username)
            await AsyncStorage.setItem('savedRecipeIds', data.savedRecipeList)
            setUserId(data.user_id.toString())
            setUsername(data.username.toString())
            setIsLoggedIn(true)
            setSavedRecipeList(data.savedRecipeList)
        } catch(e) {
            console.warn('Error in useUserData:', e)
        }
    }

    return persistUserData
}

export default useUserData