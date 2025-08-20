import { useState, useContext } from 'react'
import { View } from 'react-native'

import { AuthContext } from '../../authentication/AuthContext'
import RecipesList from '../../components/datacomponents/recipes/RecipesList'

import TextElement from '../../components/sharedcomponents/TextElement'

const MyRecipesList = () => {
    const { userId } = useContext(AuthContext)
    const [ isSharedList, setIsSharedList ] = useState(false)

    return (
        <View>
            <TextElement textValue={'Saved Recipes'} headingStyle={2} textAlign={'center'}/>
            <RecipesList isSharedList={isSharedList} userId={userId} />
        </View>
    )
}

export default MyRecipesList