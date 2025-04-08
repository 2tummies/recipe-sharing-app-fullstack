import api from '../api'

export const login = (user) => {
    try {
        api.post('meal_planner_connection/user/login/', user)
        .then(response => {
            console.log('Login successful')
            return userId
        })
        .catch(error => {
            throw error
        })
    } catch(error) {
        console.log('Error logging in' + error)
    }
}

export const register = (user) => {
    try {
        api.post('meal_planner_connection/user/register/', user)
        .then(response => {
            console.log('Login successful')
            return userId
        })
        .catch(error => {
            throw error
        })
    } catch(error) {
        console.log('Error creating user' + error)
    }
}