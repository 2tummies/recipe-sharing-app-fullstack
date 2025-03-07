import { Pressable, Text, View } from 'react-native'

import TextElement from '../../sharedcomponents/TextElement'
import RecipeTag from './RecipeTag'

import ComponentStyles from '../../../styles/additionalstyles/ComponentStyles'

const RecipeTagsSection = ({
    isForm,
    recipeTagsList,
    handleRemoveRecipeTag
}) => {
    const tagArray = recipeTagsList.map(tag => {
        return (
            <View key={tag[0]} style={ComponentStyles.itemBubbleWrapper}>
                {
                    isForm ?
                    <Pressable onPress={() => handleRemoveRecipeTag(tag)} style={ComponentStyles.itemBubble}>
                        <RecipeTag tagName={tag[1]} />
                        <Text style={ComponentStyles.itemBubbleCloseText}>X</Text>
                    </Pressable>
                    :
                    <View style={ComponentStyles.itemBubble}>
                        <RecipeTag tagName={tag[1]} />
                    </View>
                }
            </View>
        )
    })

    return (
        <>
            {
                tagArray.length ?
                <View style={ComponentStyles.itemBubbleArray}>
                    {tagArray}
                </View>
                :
                <View style={ComponentStyles.itemDefaultText}>
                    <TextElement textValue='Added tags will go here' textStyle='sm' />
                </View>
            }
        </>
    )
}

export default RecipeTagsSection