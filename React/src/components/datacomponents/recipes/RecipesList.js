import { Pressable } from 'react-native'
import { useEffect, useState } from 'react'

import { getAllSharedRecipes, getUserRecipeList } from '../../../api/calls/RecipeApi'
import RecipeListItem from './RecipeListItem'
import useUserId from '../../../hooks/auth/useUserId'

import ComponentStyles from '../../../styles/additionalstyles/ComponentStyles'

const RecipesList = ({
    navigation,
    isSharedList
}) => {
    const [ recipeList, setRecipeList ] = useState([])
    const userId = useUserId()

    useEffect(() => {
        const fetchData = async () => {
            if (isSharedList) {
                const fetchedSharedRecipes = await getAllSharedRecipes()
                setRecipeList(fetchedSharedRecipes)
            } else if (!isSharedList && userId) {
                const fetchedUserRecipes = await getUserRecipeList()
                setRecipeList(fetchedUserRecipes)
            }
        }

        fetchData()
    }, [isSharedList, userId])

    const onPressFunction = (recipeId) => {
        navigation.navigate('RecipeDetailsPage', {recipeId: recipeId})
    }

    const recipesArray = recipeList.map(recipe => {
        return (
            <Pressable key={recipe[0]} onPress={() => onPressFunction(recipe[0])} style={ComponentStyles.recipeListItem}>
                <RecipeListItem recipe={recipe} isSharedList={isSharedList}/>
            </Pressable>
        )
    })

    return (
        <>
            {recipesArray}
        </>
    )
}

export default RecipesList