import axios from 'axios'
import { VITE_API_URL } from '@env'
import * as Keychain from 'react-native-keychain'

const api = axios.create({
    baseURL: VITE_API_URL
})

api.interceptors.request.use(
    async (config) => {
        try {
            const creds = await Keychain.getGenericPassword()
            if (creds && creds.username === 'auth') {
            const parsed = JSON.parse(creds.password)
                if (parsed) {
                    config.headers.Authorization = `Bearer ${parsed.access}`
                }
            }
        } catch (e) {
            console.warn('Failed to attach auth token:', e)
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api