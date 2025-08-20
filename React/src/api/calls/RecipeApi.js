import { api, authApi } from '../api'

export const getAllSharedRecipes = async () => {
    try {
        const res = await api.get('/meal_planner_connection/recipes/')
        return res.data
    } catch(error) {
        console.log(error)
        return []
    }
}

export const getUserRecipeList = async (userId) => {
    try {
        const res = await api.get(`/meal_planner_connection/user/${userId}/recipes/`)
        return res.data
    } catch(error) {
        console.log(error)
        return []
    }
}

export const getSharedRecipeById = async (recipeId) => {
    try {
        const res = await api.get(`/meal_planner_connection/recipes/${recipeId}/`)
        return res.data
    } catch(error) {
        console.log(error)
        return []
    }
}

export const addNewRecipe = (recipe) => {
    return (
        authApi.post('/meal_planner_connection/recipes/', recipe)
        .then(response => {
            console.log('successfully posted')
        })
        .catch(error => {
            console.warn('error in post: ', error)
        })
    )
}