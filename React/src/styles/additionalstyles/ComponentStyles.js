import { StyleSheet } from 'react-native'

const ComponentStyles = StyleSheet.create({
    flexItemsRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: $spacingbase,
    },
    ingredientItemWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: $spacingsmall
    },
    ingredientItemName: {
        width: '60%',
        alignSelf: 'center'
    },
    ingredientItemMeasurementUnitWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    ingredientItemMeasurementUnitButton: {
        borderRadius: $borderradiusbase,
        borderWidth: $borderwidthbase,
        marginRight: $spacingsmall,
        padding: $spacingbase
    },
    itemBubble: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: $borderradiusmostrounded,
        borderWidth: $borderwidthbase,
        borderStyle: 'solid',
        borderColor: $greendarkforest,
        padding: $spacingbase,
        marginVertical: $spacingextrasmall
    },
    itemBubbleArray: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemBubbleCloseText: {
        opacity: .4,
        marginLeft: $spacingextralarge
    },
    itemBubbleDefaultText: {
        marginVertical: $spacingsmall,
        opacity: .8
    },
    itemBubbleWrapper: {
        width: 'fit-content',
        padding: $spacingsmall,
    },
    oneAcrossItem: {
        width: '100%',
    },
    twoAcrossItem: {
        width: '49%',
    },
    pressableButtonBase: {
        height: $pressablebuttonheight,
        paddingHorizontal: $pressablebuttonhorizontalpadding,
        paddingVertical: $pressablebuttonhorizontalpadding,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: $borderradiusbase,
        borderWidth: $borderwidthbase,
        borderStyle: 'solid',
        borderColor: $greendarkforest,
    },
    pressableButtonSquared: {
        aspectRatio: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: $borderradiusbase,
        borderWidth: $borderwidthbase,
        borderStyle: 'solid',
        borderColor: $greendarkforest,
        padding: $pressablebuttonsquaredinnerpadding,
    },
    pressableButtonBubbled: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: $greenoffwhite,
        borderRadius: $borderradiusmorerounded,
        borderWidth: $borderwidthbase,
        borderStyle: 'solid',
        borderColor: $greenforest,
        padding: $pressablebuttonbubbledinnerpadding,
        marginVertical: $spacingsmall
    },
    pressableButtonOnPressIn: {
        backgroundColor: $greenlight,
    },
    pressableButtonText: {
        textAlign: 'center',
        fontWeight: $fontweightheavy,
    },
})

export default ComponentStyles