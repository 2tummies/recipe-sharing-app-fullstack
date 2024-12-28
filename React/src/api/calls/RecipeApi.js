import api from '../api'

export const getAllSharedRecipes = async () => {
    try {
        const res = await api.get('/meal_planner_connection/recipes')
        return res.data
    } catch(error) {
        console.log(error)
        return []
    }
}

export const getSharedRecipeById = async (recipeId) => {
    try {
        const res = await api.get(`/meal_planner_connection/recipes/${recipeId}`)
        return res.data
    } catch(error) {
        console.log(error)
        return ''
    }
}

export const addNewRecipe = (recipe) => {
    return (
        api.post('/meal_planner_connection/recipes', recipe)
        .then(response => {
            console.log('successfully posted')
        })
        .catch(error => {
            console.log('error in post')
        })
    )
}