import api from '../api'

export const getAllMeasurementUnits = async () => {
    try {
        const res = await api.get('/meal_planner_connection/measurement_units')
        return res.data
    } catch(error) {
        console.log(error)
        return []
    }
}