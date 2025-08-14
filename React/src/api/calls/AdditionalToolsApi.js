import api from '../api'

export const getAllAdditionalTools = async () => {
    try {
        const res = await api.get('/meal_planner_connection/additional_tools/')
        return res.data
    } catch(error) {
        console.log(error)
        return []
    }
}