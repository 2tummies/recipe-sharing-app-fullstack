import api from '../api'

export const getAllRecipes = () => {
    
}

export const addNewRecipe = () => {
    try {
        api.post('/meal_planner_connection/recipes')
        .then()
    } catch(error) {
        alert(error)
    }
}