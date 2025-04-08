import { View, Text, Button } from 'react-native'

// Styles
import GlobalStyles from '../../styles/GlobalStyles'

const ProfileLanding = ({ navigation }) => {
    return (
        <View style={GlobalStyles.global}>
            <Text style={GlobalStyles.fontStyle}>Profile Landing</Text>
            <Button
                title='Profile Details'
                style={GlobalStyles.buttonStyle}
                onPress={() => navigation.navigate('ProfileDetails')}
            />
            <Button
                title='Profile Preferences'
                onPress={() => navigation.navigate('ProfilePreferences')}
            />
        </View>
    )
}

export default ProfileLanding