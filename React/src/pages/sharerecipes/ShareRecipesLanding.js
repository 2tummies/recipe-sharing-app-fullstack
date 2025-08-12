import { useState, useEffect } from 'react'
import { Text, Button, ScrollView } from 'react-native'

import RecipesList from '../../components/datacomponents/recipes/RecipesList'

const ShareRecipesLanding = ({navigation}) => {
    const [ isSharedList, setIsSharedList ] = useState()

    useEffect(() => {
        const initSharedRecipes = () => {
            setIsSharedList(true)
        }

        initSharedRecipes()
    }, [])
    return (
        <ScrollView>
            <Button
                title='Share a Recipe'
            />
            <Text>Look for a Recipe</Text>
            <RecipesList navigation={navigation} isSharedList={isSharedList} />
        </ScrollView>
    )
}

export default ShareRecipesLanding