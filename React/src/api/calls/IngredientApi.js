import api from '../api'

export const getAllIngredients = async () => {
    try {
        const res = await api.get('/meal_planner_connection/ingredients/')
        return res.data
    } catch(error) {
        console.log(error)
        return []
    }
}