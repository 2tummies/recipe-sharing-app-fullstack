import api from '../api'

export const login = async (user) => {
    try {
        const response = await api.post('meal_planner_connection/user/login/', user)
        return response.data
    } catch(error) {
        const errorData = error.response?.data || { error: 'Login failed' }
        console.log('Error creating user' + errorData)
        throw errorData
    }
}

export const register = async (user) => {
    try {
        const response = await api.post('meal_planner_connection/user/register/', user)
        return response.data
    } catch(error) {
        const errorData = error.response?.data || { error: 'Login failed' }
        console.log('Error creating user' + errorData)
        throw errorData
    }
}