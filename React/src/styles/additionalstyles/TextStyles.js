import { StyleSheet } from 'react-native'

const TextStyles = StyleSheet.create({
    headingTwo: {
        fontFamily: $fontfamily,
        fontSize: $headingfontsizelarge,
        fontWeight: $fontweightheaviest,
    },
    headingThree: {
        fontFamily: $fontfamily,
        fontSize: $headingfontsizebase,
        fontWeight: $fontweightheavy,
    },
    headingFour: {
        fontFamily: $fontfamily,
        fontSize: $headingfontsizesmall,
        fontWeight: $fontweightheavy,
    },
    textSizeSmall: {
        fontFamily: $fontfamily,
        fontSize: $fontsizesmall,
        fontWeight: $fontweightbase,
        lineHeight: $lineheightxsmall,
    },
    textSizeBase: {
        fontFamily: $fontfamily,
        fontSize: $fontsizebase,
        fontWeight: $fontweightbase,
        lineHeight: $lineheightbase,
    },
    textSizeLarge: {
        fontFamily: $fontfamily,
        fontSize: $fontsizelarge,
        fontWeight: $fontweightbase,
        lineHeight: $lineheightlarge,
    },
    textSizeXL: {
        fontFamily: $fontfamily,
        fontSize: $fontsizexl,
        fontWeight: $fontweightheavy,
        lineHeight: $lineheightlarge,
    },
    textAlignLeft: {
        textAlign: 'left',
    },
    textAlignCenter: {
        textAlign: 'center',
    },
    textAlignRight: {
        textAlign: 'right',
    },
})

export default TextStyles