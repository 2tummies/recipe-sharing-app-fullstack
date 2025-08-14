import { useContext } from 'react'
import { AuthContext } from '../../authentication/AuthContext'
import { login } from '../../api/user/UserApi'
import useUserData from '../../hooks/users/useUserData'

const useLogin = () => {
    const { setIsLoggedIn } = useContext(AuthContext)
    const persistUserData = useUserData()
    return async (loginData) => {
        try {
            const result = await login(loginData)
            const { access, refresh } = result
            const data = {
                user_id: result['user_id'],
                username: result['username'],
                access,
                refresh
            }
            await persistUserData(data)
            setIsLoggedIn(true)
        } catch (e) {
            console.warn('Error in useLogin: ', e)
        }
    }
}

export default useLogin