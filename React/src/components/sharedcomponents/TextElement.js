import { useState, useEffect } from 'react'
import { Text, StyleSheet } from 'react-native'

import TextStyles from '../../styles/additionalstyles/TextStyles'

const TextElement = ({
    textValue,
    headingStyle,
    textStyle,
    textAlign
}) => {
    const [style, setStyle] = useState()
    const [alignment, setAlignment] = useState()

    useEffect (() => {
            {
                headingStyle == '2' ? setStyle(TextStyles.headingTwo)
                : headingStyle == '3' ? setStyle(TextStyles.headingThree)
                : headingStyle == '4' ? setStyle(TextStyles.headingFour)
                : textStyle == 'xl' ? setStyle(TextStyles.textSizeXL)
                : textStyle == 'lg' ? setStyle(TextStyles.textSizeLarge)
                : textStyle == 'sm' ? setStyle(TextStyles.textSizeSmall)
                : setStyle(TextStyles.base)
            }
            {
                textAlign == 'center' ? setAlignment(TextStyles.textAlignCenter)
                : textAlign == 'right' ? setAlignment(TextStyles.textAlignRight)
                : setAlignment(TextStyles.textAlignLeft)
            }
    }, [])

    return (
        <Text style={[style, alignment, styles.textStyle]}>{textValue}</Text>
    )
}

export default TextElement

const styles = StyleSheet.create({
    textStyle: {
        width: 'fit-content'
    }
})