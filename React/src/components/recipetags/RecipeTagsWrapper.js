import {  useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import SelectDropdown from 'react-native-select-dropdown'

import TextElement from '../shared/TextElement'
import RecipeTagsSection from './RecipeTagsSection'
import api from '../../api/api'

import GlobalStyles from '../../styles/GlobalStyles'
import ComponentStyles from '../../styles/additionalstyles/ComponentStyles'

const RecipeTagsWrapper = ({
    isForm,
    recipeTagsList,
    handleAddRecipeTag,
    handleRemoveRecipeTag
}) => {
    const { control } = useForm()
    const [ recipeTags, setRecipeTags ] = useState([])

    const dupeException = 'Already added'

    useEffect(() => {
        getRecipeTags()
    }, [])

    const getRecipeTags = () => {
        api.get('/meal_planner_connection/recipe_tags')
        .then((res) => {
            setRecipeTags(prevItems => [...prevItems, ...res.data])
        })
        .catch((error) => {
            alert(error)
        })
    }

    const addRecipeTag = (e) => {
        if (!recipeTagsList.includes(e)) {
            handleAddRecipeTag(e)
        } else {
            throw dupeException
        }
    }

    return (
        <>
            <View style={GlobalStyles.subsectionHeader}>
                <TextElement textValue='Recipe Tags' textStyle='xl' />
            </View>
            <RecipeTagsSection
                isForm={isForm}
                recipeTagsList={recipeTagsList}
                handleRemoveRecipeTag={handleRemoveRecipeTag}
            />
            <Controller 
                name='create-recipe-tags-list'
                control={control}
                render={({ field: { onChange, value=[] } }) => {
                    return (
                        <SelectDropdown
                            data={recipeTags}
                            onSelect={(selectedItem, index) => {
                                addRecipeTag(selectedItem)
                                onChange([...value, selectedItem])
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={ComponentStyles.pressableButtonBubbled}>
                                        <TextElement textValue='Add Recipe Tag' />
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
                        />
                    )
                }}
            />
        </>
    )
}

export default RecipeTagsWrapper