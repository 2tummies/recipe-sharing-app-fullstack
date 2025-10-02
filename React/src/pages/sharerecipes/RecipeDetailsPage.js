import { ScrollView, Text, View } from 'react-native'
import { useEffect, useState, useContext } from 'react'

import { AuthContext } from '../../authentication/AuthContext'
import { getSharedRecipeById } from '../../api/calls/RecipeApi'
import RecipeName from '../../components/datacomponents/recipebasics/RecipeName'
import RecipeDescription from '../../components/datacomponents/recipebasics/RecipeDescription'
import RecipePrepTime from '../../components/datacomponents/recipebasics/RecipePrepTime'
import RecipeCookTime from '../../components/datacomponents/recipebasics/RecipeCookTime'
import InstructionsWrapper from '../../components/datacomponents/instructions/InstructionsWrapper'
import RecipeTagsWrapper from '../../components/datacomponents/recipetags/RecipeTagsWrapper'
import CookingMethodsWrapper from '../../components/datacomponents/cookingmethods/CookingMethodsWrapper'
import AdditionalToolsWrapper from '../../components/datacomponents/additionaltools/AdditionalToolsWrapper'
import IngredientsWrapper from '../../components/datacomponents/ingredients/IngredientsWrapper'
import FavoriteHeart from '../../components/sharedcomponents/FavoriteHeart'

import GlobalStyles from '../../styles/GlobalStyles'
import ComponentStyles from '../../styles/additionalstyles/ComponentStyles'

const RecipeDetailsPage = ({
    route
}) => {
    const { isLoggedIn } = useContext(AuthContext)
    const { recipeId: recipeId } = route.params
    const [ recipe, setRecipe ] = useState()
    const [ isForm, setIsForm ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        const fetchRecipe = async (recipeId) => {
            const fetchedRecipe = await getSharedRecipeById(recipeId)
            setRecipe(fetchedRecipe)
            setIsLoading(false)
        }

        fetchRecipe(recipeId)
    }, [recipeId])

    return (
        <>
            {
                isLoading ? 
                <Text>Loading...</Text>
                :
                <ScrollView style={GlobalStyles.pageContainer}>
                    {
                        isLoggedIn && !isForm &&
                            <>
                                <FavoriteHeart recipeId={recipeId}/>
                            </>
                    }
                    <RecipeName isForm={isForm} recipeName={recipe.recipe_name}/>
                    <RecipeTagsWrapper isForm={isForm} recipeTagsList={recipe.recipe_tags} />
                    <RecipeDescription isForm={isForm} recipeDescription={recipe.recipe_description} />
                    <View style={ComponentStyles.flexItemsRow}>
                        <View style={[GlobalStyles.formItem, ComponentStyles.twoAcrossItem]}>
                            <RecipePrepTime isForm={isForm} recipePrepTime={recipe.recipe_prep_time} />
                        </View>
                        <View style={[GlobalStyles.formItem, ComponentStyles.twoAcrossItem]}>
                            <RecipeCookTime isForm={isForm} recipeCookTime={recipe.recipe_cook_time} />
                        </View>
                    </View>
                    <CookingMethodsWrapper isForm={isForm} cookingMethodsList={recipe.recipe_cooking_methods} />
                    <AdditionalToolsWrapper isForm={isForm} additionalToolsList={recipe.recipe_additional_tools} />
                    <IngredientsWrapper isForm={isForm} ingredientsList={recipe.recipe_ingredients} />
                    <InstructionsWrapper isForm={isForm} instructionsList={recipe.recipe_instructions} />
                </ScrollView>
            }
        </>
    )
}

export default RecipeDetailsPage