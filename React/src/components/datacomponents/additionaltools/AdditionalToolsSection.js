import { Pressable, Text, View } from 'react-native'

import TextElement from '../../sharedcomponents/TextElement'
import AdditionalTool from './AdditionalTool'

import ComponentStyles from '../../../styles/additionalstyles/ComponentStyles'

const AdditionalToolSection = ({
    isForm,
    additionalToolsList,
    handleRemoveAdditionalTool
}) => {
    const toolArray = additionalToolsList.map((tool) => {
        return (
            <View key={tool[0]} style={ComponentStyles.itemBubbleWrapper}>
                {
                    isForm ?
                    <Pressable onPress={() => handleRemoveAdditionalTool(tool)} style={ComponentStyles.itemBubble}>
                        <AdditionalTool toolName={tool[1]} />
                        <Text style={ComponentStyles.itemBubbleCloseText}>X</Text>
                    </Pressable>
                    :
                    <AdditionalTool toolName={tool[1]} />
                }
            </View>
        )
    })

    return (
        <>
            {
                toolArray.length ?
                <View style={ComponentStyles.itemBubbleArray}>
                    {toolArray}
                </View>
                :
                <View style={ComponentStyles.itemDefaultText}>
                    <TextElement textValue='Additional tools will go here' textStyle='sm' />
                </View>
            }
        </>
    )
}

export default AdditionalToolSection