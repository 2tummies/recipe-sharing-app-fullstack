import { View, Text, Button } from 'react-native'

import SharedRecipesList from '../../components/datacomponents/sharedrecipes/SharedRecipesList'

const ShareRecipesLanding = ({navigation}) => {

    return (
        <View>
            <Button
                title='Share a Recipe'
            />
            <Text>Look for a Recipe</Text>
            <SharedRecipesList navigation={navigation} />
        </View>
    )
}

export default ShareRecipesLanding