import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import SelectDropdown from 'react-native-select-dropdown'

import TextElement from '../../sharedcomponents/TextElement'
import RecipeTagsSection from './RecipeTagsSection'
import { getAllRecipeTags } from '../../../api/calls/RecipeTagsApi'

import GlobalStyles from '../../../styles/GlobalStyles'
import ComponentStyles from '../../../styles/additionalstyles/ComponentStyles'

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
        const fetchRecipeTags = async () => {
            const fetchedRecipeTags = await getAllRecipeTags()
            setRecipeTags(fetchedRecipeTags) 
        }
        fetchRecipeTags()
    }, [])

    const addRecipeTag = (e) => {
        if (!recipeTagsList.includes(e)) {
            handleAddRecipeTag(e)
        } else {
            throw dupeException
        }
    }

    return (
        <>
            {
                isForm ?
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
                :
                <View style={ComponentStyles.tagAndToolWrapper}>
                    <RecipeTagsSection
                        isForm={isForm}
                        recipeTagsList={recipeTagsList}
                        handleRemoveRecipeTag={handleRemoveRecipeTag}
                    />
                </View>
            }
        </>
    )
}

export default RecipeTagsWrapper