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
            if (data.savedRecipeList && data.savedRecipeList.size > 0) {
                // TODO: might need to verify arr is not already an array, from useLogin
                const arr = Array.from(data.savedRecipeList)
                await AsyncStorage.setItem('savedRecipeIds', JSON.stringify(arr))
                setSavedRecipeList(new Set(arr))
            } else {
                await AsyncStorage.setItem('savedRecipeIds', JSON.stringify([]))
                setSavedRecipeList(new Set())
            }
            setUserId(data.user_id.toString())
            setUsername(data.username.toString())
            setIsLoggedIn(true)
        } catch(e) {
            console.warn('Error in useUserData:', e)
        }
    }

    return persistUserData
}

export default useUserData