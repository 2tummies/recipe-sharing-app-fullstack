import { Pressable, Text } from 'react-native'

import ComponentStyles from '../../styles/additionalstyles/ComponentStyles'

const RemoveItemX = ({
    removeFunction
}) => {
    return (
        <Pressable onPress={removeFunction} style={ComponentStyles.removeButton}>
            <Text style={ComponentStyles.removeButtonText}>X</Text>
        </Pressable>
    )
}

export default RemoveItemX