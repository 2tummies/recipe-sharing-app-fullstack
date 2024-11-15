import { useState, useEffect } from 'react'
import { Pressable, Text } from 'react-native'

import ComponentStyles from '../../styles/additionalstyles/ComponentStyles'
import TextStyles from '../../styles/additionalstyles/TextStyles'

const PressableButton = ({
    buttonText,
    onPressFunction,
    inheritedPressRetentionOffset,
    numAcross,
    pressableType,
    textSize,
}) => {
    const [isPressedIn, setIspressedIn] = useState(false)
    const [buttonStyle, setButtonStyle] = useState()
    const [textStyle, setTextStyle] = useState()
    const [numberAcross, setNumberAcross] = useState()
    const [pressRetentionOffset, setPressRetentionOffset] = useState($pressablebuttonpressretention)

    useEffect (() => {
        if (inheritedPressRetentionOffset) {
            setPressRetentionOffset(inheritedPressRetentionOffset)
        }
        {
            pressableType == 'squared' ? setButtonStyle(ComponentStyles.pressableButtonSquared)
            : setButtonStyle(ComponentStyles.pressableButtonBase)
        }
        {
            numAcross == '2' ? setNumberAcross(ComponentStyles.twoAcrossItem)
            : setNumberAcross(ComponentStyles.oneAcrossItem)
        }
        {
            textSize == 'xl' ? setTextStyle(TextStyles.textSizeXL)
            : textSize == 'lg' ? setTextStyle(TextStyles.textSizeLarge)
            : textSize == 'sm' ? setTextStyle(TextStyles.textSizeSmall)
            : setTextStyle(TextStyles.base)
        }
    }, [])

    const onPressInFunction = () => {
        setIspressedIn(true)
    }
    const onPressOutFunction = () => {
        setIspressedIn(false)
    }

    return (
        <Pressable
            pressRetentionOffset={pressRetentionOffset}
            onPress={onPressFunction}
            onPressIn={onPressInFunction}
            onPressOut={onPressOutFunction}
            style={
                isPressedIn ?
                [ComponentStyles.pressableButtonOnPressIn, ComponentStyles.pressableButtonBase, buttonStyle, numberAcross] :
                [ComponentStyles.pressableButtonBase, buttonStyle, numberAcross]
            }
        >
            <Text style={[ComponentStyles.pressableButtonText, textStyle]}>{buttonText}</Text>
        </Pressable>
    )
}

export default PressableButton