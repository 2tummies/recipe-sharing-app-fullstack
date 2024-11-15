import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Components
import ShareRecipesLanding from './ShareRecipesLanding'
import FilterRecipes from './FilterRecipes'

const ShareRecipes = () => {

    const ShareRecipesStack = createNativeStackNavigator()

    return (
        <ShareRecipesStack.Navigator
            screenOptions={{
                headerTitleStyle: {
                    fontFamily: $fontfamily
                }
            }}
        >
            <ShareRecipesStack.Screen
                name='ShareRecipe'
                component={ShareRecipesLanding}
                options={{
                    title: 'Share Recipes'
                }}
            />
            <ShareRecipesStack.Screen
                name='FilterRecipes'
                component={FilterRecipes}
                options={{
                    title:'Look for a new recipe'
                }}
            />
        </ShareRecipesStack.Navigator>
    )
}

export default ShareRecipes