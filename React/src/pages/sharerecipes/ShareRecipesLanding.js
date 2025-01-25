import { View, Text, Button, ScrollView } from 'react-native'

import SharedRecipesList from '../../components/datacomponents/sharedrecipes/SharedRecipesList'

const ShareRecipesLanding = ({navigation}) => {
    return (
        <ScrollView>
            <Button
                title='Share a Recipe'
            />
            <Text>Look for a Recipe</Text>
            <SharedRecipesList navigation={navigation} />
        </ScrollView>
    )
}

export default ShareRecipesLanding