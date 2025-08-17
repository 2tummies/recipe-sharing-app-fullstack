import * as Keychain from 'react-native-keychain'
import { jwtDecode } from 'jwt-decode'

import { AuthContext } from '../../authentication/AuthContext'
import LogoutHelper from '../users/LogoutHelper'
import { refreshToken } from '../../api/user/UserApi'
import useUserData from '../users/useUserData'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function useAuthToken() {
    const { setIsLoggedIn, setUserId, setUsername } = useContext(AuthContext)
    const persistUserData = useUserData()
    const logout = async () => {
        await LogoutHelper({setUserId, setUsername, setIsLoggedIn})
    }
    // TODO: Add loading/spinner
    const loadToken = async () => {
        try {
            const currentTime = Date.now() / 1000
            const creds = await Keychain.getGenericPassword()
            const parsed = JSON.parse(creds.password)
            if (jwtDecode(parsed.refresh).exp > currentTime) {
                if (jwtDecode(parsed.access).exp > currentTime) {
                    return parsed.access
                } else {
                    const res = await refreshToken(parsed.refresh)
                    const username = AsyncStorage.getItem('username')
                    const updatedCreds = {
                        user_id: parsed.userId,
                        username: username,
                        access: res.access,
                        refresh: parsed.refresh
                    }
                    await persistUserData(updatedCreds)
                    return updatedCreds.access
                }
            } else {
                await logout()
                return null
            }
        } catch (e) {
            console.log('Creds not found: ', e)
            await logout()
            return null
        }
    }

    return loadToken
}
