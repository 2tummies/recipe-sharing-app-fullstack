import api from '../api'

export const getAllIngredients = () => {
    try {
        api.get('/meal_planner_connection/ingredients')
        .then((res) => {
            // setIngredients(prevItems => [...prevItems, ...res.data])
            return (prevItems => [...prevItems, ...res.data])
        })
    } catch(error) {
        alert(error)
    }
}