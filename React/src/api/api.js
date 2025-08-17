import axios from 'axios'
import { VITE_API_URL } from '@env'

export const api = axios.create({
    baseURL: VITE_API_URL
})

export const authApi = axios.create({
    baseURL: VITE_API_URL
})

export const setupInterceptor = (getToken) => {
    authApi.interceptors.request.use(
        async (config) => {
            try {
                const loadToken = await getToken()
                config.headers.Authorization = `Bearer ${loadToken}`
            } catch (e) {
                console.warn('Failed to attach auth token:', e)
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}