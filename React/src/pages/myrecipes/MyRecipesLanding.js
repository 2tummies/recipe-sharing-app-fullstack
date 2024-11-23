import { View, StyleSheet } from 'react-native'

import PressableButton from '../../components/sharedcomponents/PressableButton'

import GlobalStyles from '../../styles/GlobalStyles'
import ComponentStyles from '../../styles/additionalstyles/ComponentStyles'

const MyRecipesLanding = ({navigation}) => {

    const findRecipeOnPress = () => {
        navigation.navigate('ShareRecipes')
    }

    const createRecipeOnPress = () => {
        navigation.navigate('MyRecipesCreateRecipe')
    }

    const randomRecipeOnPress = () => {
        navigation.navigate('MyRecipesRandomRecipe')
    }

    const myRecipeListOnPress = () => {
        navigation.navigate('MyRecipesList')
    }

    return (
        <View style={[GlobalStyles.pageContainer, styles.buttonContainer]}>
            <View style={[styles.buttonRowContainer, ComponentStyles.flexItemsRow]}>
                <PressableButton buttonText='Look for a new Recipe' onPressFunction={findRecipeOnPress} pressableType='squared' numAcross='2' textSize='xl' />
                <PressableButton buttonText='Create a new Recipe' onPressFunction={createRecipeOnPress} pressableType='squared' numAcross='2' textSize='xl' />
            </View>
            <View style={[styles.buttonRowContainer, ComponentStyles.flexItemsRow]}>
                <PressableButton buttonText='My Recipe List' onPressFunction={myRecipeListOnPress} pressableType='squared' numAcross='2' textSize='xl' />
                <PressableButton buttonText='Random Recipe button' onPressFunction={randomRecipeOnPress} pressableType='squared' numAcross='2' textSize='xl' />
            </View>
        </View>
    )
}

export default MyRecipesLanding

const styles = StyleSheet.create({
    buttonContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    buttonRowContainer: {
        width: '100%',
        marginVertical: $spacingbase,
    },
})