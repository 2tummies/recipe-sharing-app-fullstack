import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import SelectDropdown from 'react-native-select-dropdown'

import TextElement from '../../sharedcomponents/TextElement'
import IngredientsSection from './IngredientsSection'
import { getAllIngredients } from '../../../api/calls/IngredientApi'

import GlobalStyles from '../../../styles/GlobalStyles'
import ComponentStyles from '../../../styles/additionalstyles/ComponentStyles'

const IngredientsWrapper = ({
    isForm,
    ingredientsList,
    handleAddIngredient,
    handleRemoveIngredient
}) => {
    const { control } = useForm()
    const [ ingredients, setIngredients] = useState([])

    const dupeException = 'Already added'

    useEffect(() => {
        const fetchIngredients = async () => {
            const fetchedIngredients = await getAllIngredients()
            setIngredients(fetchedIngredients) 
        }
        fetchIngredients()
    }, [])

    const addIngredient = (ingredient) => {
        ingredToAdd = {
            ingredient_id: ingredient[0],
            ingredient_value: ingredient[1],
            calories_per_hundred: ingredient[2],
        }
        ingredientsList.map(item => {
            if (item.ingredient_id === ingredToAdd.ingredient_id) {
                throw dupeException
            }
        })
        handleAddIngredient(ingredToAdd)
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
                                        <TextElement textValue={item[1]} />
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