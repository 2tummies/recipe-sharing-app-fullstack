import {  useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import SelectDropdown from 'react-native-select-dropdown'

import TextElement from '../shared/TextElement'
import IngredientsSection from './IngredientsSection'
import { getAllIngredients } from '../../api/ingredient/IngredientApi'

import GlobalStyles from '../../styles/GlobalStyles'
import ComponentStyles from '../../styles/additionalstyles/ComponentStyles'

const IngredientsWrapper = ({
    isForm,
    ingredientsList,
    handleAddIngredient,
    handleRemoveIngredient
}) => {
    const { control } = useForm()
    const [ ingredients, setIngredients] = useState([])
    const [ recipeIngredientToAdd, setRecipeIngredientToAdd] = useState([])

    const dupeException = 'Already added'

    useEffect(() => {
        // getIngredients()
        setIngredients(getAllIngredients())
    }, [])

    // const getIngredients = () => {
        // api.get('/meal_planner_connection/ingredients')
        // .then((res) => {
        //     setIngredients(prevItems => [...prevItems, ...res.data])
        // })
        // .catch((error) => {
        //     alert(error)
        // })
    // }

    const addIngredient = (ingredient) => {
        ingredToAdd = {
            id: ingredient[0],
            value: ingredient[1],
            calories: ingredient[2],
        }
        if (!ingredientsList.some(ingredient => {ingredient.id === ingredToAdd.id})) {
            handleAddIngredient(ingredToAdd)
        } else {
            throw dupeException
        }
    }

    return (
        <>
            <View style={GlobalStyles.subsectionHeader}>
                <TextElement textValue='Ingredients' textStyle='xl' />
            </View>
            <IngredientsSection
                isForm={isForm}
                ingredientsList={ingredientsList}
                handleRemoveIngredient={handleRemoveIngredient}
            />
            <Controller
                name='create-recipe-ingredients-list'
                control={control}
                rules={{
                    required: true
                }}
                render={({ field: { onChange, value=[]} }) => {
                    return (
                        <SelectDropdown
                            data={ingredients}
                            onSelect={(selectedItem, index) => {
                                addIngredient(selectedItem)
                                onChange([...value, selectedItem])
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={ComponentStyles.pressableButtonBubbled}>
                                        <TextElement textValue='Add Ingredient' />
                                    </View>
                                )
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <>
                                        <Text>{item[1]}</Text>
                                    </>
                                )
                            }}
                            showsVerticalScrollIndicator={false}
                            search
                        />
                    )
                }}
            />
        </>
    )
}

export default IngredientsWrapper