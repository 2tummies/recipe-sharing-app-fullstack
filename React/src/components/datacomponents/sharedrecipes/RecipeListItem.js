import { View, Text } from 'react-native'

const RecipeListItem = ({
    recipe,
    isShared
}) => {
    return (
        <View>
            <Text>Name: {recipe[1]}</Text>
            <Text>Desc: {recipe[2]}</Text>
            {
                isShared ? <Text>Author: Will go here</Text>
                :
                ''
            }
            
        </View>
    )
}

export default RecipeListItem