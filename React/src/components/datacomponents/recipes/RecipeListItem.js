import { View, Text } from 'react-native'

const RecipeListItem = ({
    recipe,
    isSharedList
}) => {
    return (
        <View>
            <Text>Name: {recipe[1]}</Text>
            <Text>Desc: {recipe[2]}</Text>
            {
                isSharedList ??
                    <Text>Author: Will go here</Text>
            }
            
        </View>
    )
}

export default RecipeListItem