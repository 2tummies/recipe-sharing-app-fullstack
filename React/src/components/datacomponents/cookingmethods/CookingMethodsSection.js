import { Pressable, Text, View } from 'react-native'

import TextElement from '../../sharedcomponents/TextElement'
import CookingMethod from './CookingMethod'

import ComponentStyles from '../../../styles/additionalstyles/ComponentStyles'

const CookingMethodsSection = ({
    isForm,
    cookingMethodsList,
    handleRemoveCookingMethod
}) => {
    const methodArray = cookingMethodsList.map(method => {
        return (
            <View key={method[0]} style={ComponentStyles.itemBubbleWrapper}>
                {
                    isForm ?
                    <Pressable onPress={() => handleRemoveCookingMethod(method)} style={ComponentStyles.itemBubble}>
                        <CookingMethod methodName={method[1]} />
                        <Text style={ComponentStyles.itemBubbleCloseText}>X</Text>
                    </Pressable>
                    :
                    <CookingMethod methodName={method[1]} />
                }
            </View>
        )
    })

    return (
        <>
            {
                methodArray.length ?
                <View style={ComponentStyles.itemBubbleArray}>
                    {methodArray}
                </View>
                :
                <View style={ComponentStyles.itemBubbleDefaultText}>
                    <TextElement textValue='Added cooking methods will go here' textStyle='sm' />
                </View>
            }
        </>
    )
}

export default CookingMethodsSection