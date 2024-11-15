import { ScrollView, View, StyleSheet } from 'react-native'

// Components
import RecipeForm from '../../components/forms/RecipeForm'
import PressableButton from '../../components/shared/PressableButton'
import TextElement from '../../components/shared/TextElement'

// Styles
import GlobalStyles from '../../styles/GlobalStyles'

const MyRecipesCreateRecipe = ({ navigation }) => {

    const onPressFunction = () => {
        navigation.navigate('MyRecipesLanding')
    }

    const redirOnSubmit = () => {
        navigation.navigate('MyRecipesLanding')
        navigation.navigate('MyRecipesList')
    }

    return (
        <ScrollView style={GlobalStyles.pageContainer}>
            <TextElement textValue='Create Recipe Form' headingStyle='2' />
            <View style={styles.formWrapper}>
                <RecipeForm redirOnSubmit={redirOnSubmit}/>
            </View>
            <View style={styles.buttonWrapper}>
                <PressableButton buttonText='Cancel' onPressFunction={onPressFunction}/>
            </View>
        </ScrollView>
    )
}
export default MyRecipesCreateRecipe

const styles = StyleSheet.create({
    buttonWrapper: {
        width: $pressablebuttonwidthsmall,
        marginVertical: $spacingbase,
        paddingBottom: $spacingextralarge
    },
    formWrapper: {
        width: '100%',
    },
})