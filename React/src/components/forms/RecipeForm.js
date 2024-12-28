import { View, TextInput, StyleSheet, Text } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useEffect, useState } from 'react'

// Components
import PressableButton from '../sharedcomponents/PressableButton'

import RecipeName from '../datacomponents/recipebasics/RecipeName'
import RecipeDescription from '../datacomponents/recipebasics/RecipeDescription'
import RecipePrepTime from '../datacomponents/recipebasics/RecipePrepTime'
import RecipeCookTime from '../datacomponents/recipebasics/RecipeCookTime'
import RecipeTagsWrapper from '../datacomponents/recipetags/RecipeTagsWrapper'
import CookingMethodsWrapper from '../datacomponents/cookingmethods/CookingMethodsWrapper'
import AdditionalToolsWrapper from '../datacomponents/additionaltools/AdditionalToolsWrapper'
import IngredientsWrapper from '../datacomponents/ingredients/IngredientsWrapper'
import InstructionsWrapper from '../datacomponents/instructions/InstructionsWrapper'
import { addNewRecipe } from '../../api/calls/RecipeApi'

// Styles
import GlobalStyles from '../../styles/GlobalStyles'
import ComponentStyles from '../../styles/additionalstyles/ComponentStyles'

const AddRecipeForm = ({redirOnSubmit}) => {
    const { handleSubmit } = useForm()
    const [ loading, isLoading ] = useState(false)
    const [ isForm, setIsForm ] = useState(false)

    const [ recipeName, setRecipeName ] = useState()
    const [ recipeDescription, setRecipeDescription ] = useState()
    const [ recipeCookTime, setRecipeCookTime ] = useState()
    const [ recipePrepTime, setRecipePrepTime ] = useState()
    const [ ingredientsList, setIngredientsList ] = useState([])
    const [ recipeTagsList, setRecipeTagsList ] = useState([])
    const [ cookingMethodsList, setCookingMethodsList ] = useState([])
    const [ additionalToolsList, setAdditionalToolsList ] = useState([])
    const [ instructionsList, setInstructionsList ] = useState([])

    useEffect(() => {
        initForm()
    }, [])

    const initForm = () => {
        setIsForm(true)
    }

    const handleAddCookingMethod = (method) => {
        setCookingMethodsList(prev => [...prev, method])
    }

    const handleRemoveCookingMethod = (method) => {
        setCookingMethodsList(prev => prev.filter(item => item !== method))
    }

    const handleAddAdditionalTool = (tool) => {
        setAdditionalToolsList(prev => [...prev, tool])
    }

    const handleRemoveAdditionalTool = (tool) => {
        setAdditionalToolsList(prev => prev.filter(item => item !== tool))
    }

    const handleAddRecipeTag = (tag) => {
        setRecipeTagsList(prev => [...prev, tag])
    }

    const handleRemoveRecipeTag = (tag) => {
        setRecipeTagsList(prev => prev.filter(item => item !== tag))
    }

    const handleAddIngredient = (ingredient) => {
        setIngredientsList(prev => [...prev, ingredient])
    }

    const handleRemoveIngredient = (ingredient) => {
        setIngredientsList(prev => prev.filter(item => item !== ingredient))
    }

    const onSubmitForm = async () => {
        isLoading(true)
        const finalData = {
            recipe_name: recipeName,
            recipe_description: recipeDescription,
            recipe_prep_time: recipePrepTime,
            recipe_cook_time: recipeCookTime,
            recipe_cooking_methods: cookingMethodsList,
            recipe_additional_tools: additionalToolsList,
            recipe_tags: recipeTagsList,
            recipe_ingredients: ingredientsList,
            recipe_instructions: instructionsList,
        }
        try {
            console.log('console right before post')
            await addNewRecipe(finalData)
            redirOnSubmit()
        }
        catch (error) {
            alert(error)
        } finally {
            isLoading(false)
            setIsForm(false)
        }
    }

    return (
        <View style={GlobalStyles.formContainer}>
            <View style={GlobalStyles.formItem}>
                <RecipeName
                    isForm={isForm}
                    recipeName={recipeName}
                    setRecipeName={setRecipeName}
                />
            </View>
            <View style={GlobalStyles.formItem}>
                <RecipeDescription
                    isForm={isForm}
                    recipeDescription={recipeDescription}
                    setRecipeDescription={setRecipeDescription}
                />
            </View>
            <View style={ComponentStyles.flexItemsRow}>
                <View style={[GlobalStyles.formItem, ComponentStyles.twoAcrossItem]}>
                    <RecipePrepTime
                        isForm={isForm}
                        recipePrepTime={recipePrepTime}
                        setRecipePrepTime={setRecipePrepTime}
                    />
                </View>
                <View style={[GlobalStyles.formItem, ComponentStyles.twoAcrossItem]}>
                    <RecipeCookTime
                        isForm={isForm}
                        recipeCookTime={setRecipeCookTime}
                        setRecipeCookTime={setRecipeCookTime}
                    />
                </View>
            </View>
            <View style={GlobalStyles.formItem}>
                <CookingMethodsWrapper
                    isForm={isForm}
                    cookingMethodsList={cookingMethodsList}
                    handleAddCookingMethod={handleAddCookingMethod}
                    handleRemoveCookingMethod={handleRemoveCookingMethod}
                />
            </View>
            <View style={GlobalStyles.formItem}>
                <AdditionalToolsWrapper
                    isForm={isForm}
                    additionalToolsList={additionalToolsList}
                    handleAddAdditionalTool={handleAddAdditionalTool}
                    handleRemoveAdditionalTool={handleRemoveAdditionalTool}
                />
            </View>
            <View style={GlobalStyles.formItem}>
                <RecipeTagsWrapper
                    isForm={isForm}
                    recipeTagsList={recipeTagsList}
                    handleAddRecipeTag={handleAddRecipeTag}
                    handleRemoveRecipeTag={handleRemoveRecipeTag}
                />
            </View>
            <View style={GlobalStyles.formItem}>
                <IngredientsWrapper
                    isForm={isForm}
                    ingredientsList={ingredientsList}
                    handleAddIngredient={handleAddIngredient}
                    handleRemoveIngredient={handleRemoveIngredient}
                />
            </View>
            <View style={GlobalStyles.formItem}>
                <InstructionsWrapper
                    isForm={isForm}
                    instructionsList={instructionsList}
                    setInstructionsList={setInstructionsList}
                />
            </View>
            <View style={styles.buttonWrapper}>
                <PressableButton buttonText='Save my Recipe' onPressFunction={handleSubmit(onSubmitForm)} />
            </View>
        </View>
    )
}

export default AddRecipeForm

const styles = StyleSheet.create({
    buttonWrapper: {
        width: $pressablebuttonwidthbase,
        marginVertical: $spacingsmall,
        alignSelf: 'center',
        marginTop: $spacingextralarge
    }
})