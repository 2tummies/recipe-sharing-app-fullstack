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
                isSharedList &&
                    <Text>Author: {recipe[3]}</Text>
            }
        </View>
    )
}

export default RecipeListItem