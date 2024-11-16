import { View } from 'react-native'

import TextElement from '../../sharedcomponents/TextElement'
import Ingredient from './Ingredient'
import RemoveItemX from '../../sharedcomponents/RemoveItemX'

import ComponentStyles from '../../../styles/additionalstyles/ComponentStyles'

const IngredientsSection = ({
    isForm,
    ingredientsList,
    handleRemoveIngredient
}) => {
    const ingredientArray = ingredientsList.map(ingredient => {
        return (
            <View key={ingredient.ingredient_id} style={ComponentStyles.arrayItemWrapper}>
                {
                    isForm ?
                    <>
                        <Ingredient ingredient={ingredient} isForm={isForm} ingredientsList={ingredientsList} />
                        <RemoveItemX removeFunction={() => handleRemoveIngredient(ingredient)}/>
                    </>
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
                <>
                    {ingredientArray}
                </>
                :
                <View style={ComponentStyles.itemDefaultText}>
                    <TextElement textValue='Ingredients will go here' textStyle='sm' />
                </View>
            }
        </>
    )
}

export default IngredientsSection