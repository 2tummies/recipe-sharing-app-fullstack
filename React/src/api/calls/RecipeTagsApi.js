import api from '../api'

export const getAllRecipeTags = async () => {
    try {
        const res = await api.get('/meal_planner_connection/recipe_tags')
        return res.data
    } catch(error) {
        console.log(error)
        return []
    }
}