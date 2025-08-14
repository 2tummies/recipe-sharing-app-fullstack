import { useContext } from 'react'
import { View, Text, Button } from 'react-native'

import { AuthContext } from '../../authentication/AuthContext'
import LogoutHelper from '../../hooks/users/LogoutHelper'

import GlobalStyles from '../../styles/GlobalStyles'

const ProfileLanding = ({ navigation }) => {
    const { setUserId, setUsername, setIsLoggedIn } = useContext(AuthContext)

    const logout = async () => {
        await LogoutHelper({setUserId, setUsername, setIsLoggedIn})
    }

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