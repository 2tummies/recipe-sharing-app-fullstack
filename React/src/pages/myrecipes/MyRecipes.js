import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Components
import MyRecipesLanding from './MyRecipesLanding'
import MyRecipesCreateRecipe from './MyRecipesCreateRecipe'
import MyRecipesList from './MyRecipesList'
import MyRecipesRandomRecipe from './MyRecipesRandomRecipe'

const RecipeList = () => {

    const MyRecipesStack = createNativeStackNavigator();
    return (
        <MyRecipesStack.Navigator
            screenOptions={{
                headerTitleStyle: {
                    fontFamily: $fontfamily
                }
            }}
        >
            <MyRecipesStack.Screen
                name='MyRecipesLanding'
                component={MyRecipesLanding}
                options={{
                    title: 'My Recipes'
                }}
            />
            <MyRecipesStack.Screen
                name='MyRecipesList'
                component={MyRecipesList}
                options={{
                    title: 'My Recipes'
                }}
            />
            <MyRecipesStack.Screen
                name='MyRecipesCreateRecipe'
                component={MyRecipesCreateRecipe}
                options={{
                    title: 'Create a new Recipe'
                }}
            />
            <MyRecipesStack.Screen
                name='MyRecipesRandomRecipe'
                component={MyRecipesRandomRecipe}
                options={{
                    title: 'Pick a random Recipe'
                }}
            />
        </MyRecipesStack.Navigator>
    )
}

export default RecipeList