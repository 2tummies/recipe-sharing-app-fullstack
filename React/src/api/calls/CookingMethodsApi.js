import api from '../api'

export const getAllCookingMethods = async () => {
    try {
        const res = await api.get('/meal_planner_connection/cooking_methods')
        return res.data
    } catch(error) {
        console.log(error)
        return []
    }
}