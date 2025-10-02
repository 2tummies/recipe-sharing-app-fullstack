import { View, Pressable } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import * as Keychain from 'react-native-keychain'

import { AuthContext } from '../../authentication/AuthContext'
import { saveRecipeToUserRecipeList } from '../../api/calls/RecipeApi'

import ComponentStyles from '../../styles/additionalstyles/ComponentStyles'
import GlobalStyles from '../../styles/GlobalStyles'

const FavoriteHeart = ({recipeId}) => {
    const [ isFavorited, setIsFavorited ] = useState(false)
    const [ background, setBackground ] = useState(GlobalStyles.backgroundColorTransparent)
    const { savedRecipeList, setSavedRecipeList } = useContext(AuthContext)

    useEffect(() => {
        if (savedRecipeList.has(recipeId)) {
            setIsFavorited(true)
        }
        {isFavorited ? setBackground(GlobalStyles.backgroundColorRed) : setBackground(GlobalStyles.backgroundColorTransparent)}
    }, [isFavorited])

    const onPressFunction = () => {
        const creds = Keychain.getGenericPassword()
        if (creds && creds.username === 'auth') {
            const recipes = savedRecipeList
            if (isFavorited) {
                // TODO: Add pop-up asking for confirmation to delete
                if (recipes.has(recipeId)) {
                    recipes.remove(recipeId)
                    setSavedRecipeList(new Set(recipes))
                    setIsFavorited(false)
                    saveRecipeToUserRecipeList(JSON.parse(creds.password).userId, recipeId, 'remove')
                } else {
                    console.warn('error removing id from list')
                }
            } else {
                if (recipes.has(recipeId)) {
                    console.warn('error adding id to list')
                } else {
                    recipes.add(recipeId)
                    setSavedRecipeList(new Set(recipes))
                    setIsFavorited(true)
                    saveRecipeToUserRecipeList(JSON.parse(creds.password).userId, recipeId, 'add')
                }
            }
        }
    }

    return (
        <>
            <Pressable onpress={() => onPressFunction()} style={ComponentStyles.favoriteHeartContainer}>
                <View style={[ComponentStyles.favoriteHeartLeft, background]} />
                <View style={[ComponentStyles.favoriteHeartRight, background]} />
                <View style={[ComponentStyles.favoriteHeartUnderneath, background]} />
            </Pressable>
        </>
    )
}

export default FavoriteHeart