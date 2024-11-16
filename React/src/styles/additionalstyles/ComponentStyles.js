import { StyleSheet } from 'react-native'

const ComponentStyles = StyleSheet.create({
    arrayItemWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginVertical: $spacingsmall
    },
    flexItemsRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: $spacingbase,
    },
    ingredientItemWrapper: {
        width: '90%',
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
        justifyContent: 'center',
        padding: $spacingbase,
    },
    instructionItemWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
    },
    instructionItemStep: {
        width: '10%',
        paddingLeft: $spacingsmall,
    },
    instructionItemText: {
        width: '90%',
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
    itemDefaultText: {
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
    removeButton: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    removeButtonText: {
        borderRadius: $borderradiuslessrounded,
        borderWidth: $borderwidthbase,
        textAlign: 'center',
        padding: $spacingextrasmall,
        aspectRatio: 1
    },
})

export default ComponentStyles