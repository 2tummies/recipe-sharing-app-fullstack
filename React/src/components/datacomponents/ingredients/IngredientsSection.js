import { Pressable, Text, View } from 'react-native'

import TextElement from '../../sharedcomponents/TextElement'
import Ingredient from './Ingredient'

import ComponentStyles from '../../../styles/additionalstyles/ComponentStyles'

const IngredientsSection = ({
    isForm,
    ingredientsList,
    handleRemoveIngredient
}) => {
    const ingredientArray = ingredientsList.map(ingredient => {
        return (
            <View key={ingredient.id}>
                {
                    isForm ?
                    <Pressable onPress={() => handleRemoveIngredient(ingredient)}>
                        <Ingredient ingredient={ingredient} isForm={isForm} ingredientsList={ingredientsList} />
                        {/* <Text>X</Text> */}
                    </Pressable>
                    :
                    <Ingredient ingredient={ingredient} />
                }
            </View>
        )
    })

    return(
        <>
            {
                ingredientArray.length ?
                <View>
                    {ingredientArray}
                </View>
                :
                <View style={ComponentStyles.itemBubbleDefaultText}>
                    <TextElement textValue='Ingredients will go here' textStyle='sm' />
                </View>
            }
        </>
    )
}

export default IngredientsSection