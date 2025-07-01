import { View, Text, Button } from 'react-native'
import useLogout from '../../hooks/users/useLogout'

import GlobalStyles from '../../styles/GlobalStyles'

const ProfileLanding = ({ navigation }) => {
    const logout = useLogout()
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
            <Button
                title='Logout'
                onPress={logout}
            />
        </View>
    )
}

export default ProfileLanding