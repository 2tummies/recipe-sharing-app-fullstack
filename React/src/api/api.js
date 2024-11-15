import axios from 'axios'
import { ACCESS_TOKEN } from '../constants'
import { VITE_API_URL } from '@env'

const api = axios.create({
    baseURL: VITE_API_URL
})

// TODO: auth token, add back in when authorization is added
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem(ACCESS_TOKEN)
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config
//     },
//     (error) => {
//         return Promise.reject(error)
//     }
// )

export default api