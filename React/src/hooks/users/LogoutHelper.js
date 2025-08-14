import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Keychain from 'react-native-keychain'

const LogoutHelper = async ({
    setUserId,
    setUsername,
    setIsLoggedIn
}) => {
    try {
        await Keychain.resetGenericPassword()
    } catch (e) {
        if (__DEV__) {
            console.warn('Error in LogoutHelper, Keychain reset failed (non-critical): ', e)
        }
    }
    try {
        await AsyncStorage.removeItem('username')
    } catch (e) {
        console.warn('Error in LogoutHelper: ', e)
    }
    setIsLoggedIn(false)
    setUserId(null)
    setUsername(null)
}

export default LogoutHelper