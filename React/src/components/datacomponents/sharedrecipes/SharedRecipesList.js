import { View, Text, Pressable } from 'react-native'
import { useEffect, useState } from 'react'

import { getAllSharedRecipes } from '../../../api/calls/RecipeApi'
import RecipeListItem from '../recipes/RecipeListItem'

import ComponentStyles from '../../../styles/additionalstyles/ComponentStyles'

const SharedRecipesList = ({navigation}) => {
    const [sharedRecipes, setSharedRecipes] = useState([])
    const [isShared, setIsShared] = useState()

    useEffect(() => {
        const fetchSharedRecipes = async () => {
            const fetchedSharedRecipes = await getAllSharedRecipes()
            setSharedRecipes(fetchedSharedRecipes)
        }

        fetchSharedRecipes()
        initSharedRecipes()
    }, [])

    const initSharedRecipes = () => {
        setIsShared(true)
    }

    const onPressFunction = (recipeId) => {
        navigation.navigate('SharedRecipeDetailsPage', {data: recipeId})
    }

    const sharedRecipesArray = sharedRecipes.map(recipe => {
        return (
            <Pressable key={recipe[0]} onPress={() => onPressFunction(recipe[0])} style={ComponentStyles.recipeListItem}>
                <RecipeListItem recipe={recipe} isShared={isShared}/>
            </Pressable>
        )
    })

    return (
        <>
            {sharedRecipesArray}
        </>
    )
}

export default SharedRecipesList