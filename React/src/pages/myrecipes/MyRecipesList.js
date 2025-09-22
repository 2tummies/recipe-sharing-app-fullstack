import { useState, useContext } from 'react'
import { View } from 'react-native'

import RecipesList from '../../components/datacomponents/recipes/RecipesList'

import TextElement from '../../components/sharedcomponents/TextElement'

const MyRecipesList = () => {
    const [ isSharedList, setIsSharedList ] = useState(false)

    return (
        <View>
            <TextElement textValue={'Saved Recipes'} headingStyle={2} textAlign={'center'}/>
            <RecipesList isSharedList={isSharedList} />
        </View>
    )
}

export default MyRecipesList