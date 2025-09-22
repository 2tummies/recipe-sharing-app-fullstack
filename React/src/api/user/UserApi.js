import { api } from '../api'

export const login = async (user) => {
    try {
        const response = await api.post('meal_planner_connection/token/', {
            username: user.username,
            password: user.password
        })
        return response.data
    } catch(e) {
        console.warn('Error in UserApi 1: ' + e)
        return null
    }
}

export const register = async (user) => {
    try {
        const response = await api.post('meal_planner_connection/user/register/', user)
        return response.data
    } catch(e) {
        console.warn('Error in UserApi 2: ' + e)
        return null
    }
}

export const refreshToken = async (token) => {
    try {
        const response = await api.post('meal_planner_connection/token/refresh/', {
            refresh: token
        })
        return response.data
    } catch (e) {
        console.warn('Error getting refresh: ', e)
        return null
    }
}