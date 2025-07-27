import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileLanding from './ProfileLanding';
import ProfilePreferences from './ProfilePreferences';
import ProfileDetails from './ProfileDetails';

const Profile = () => {

    const ProfileStack = createNativeStackNavigator();

    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerTitleStyle: {
                    fontFamily: $fontfamily
                }
            }}
        >
            <ProfileStack.Screen
                name='ProfileLanding'
                component={ProfileLanding}
                options={{
                    title: 'Profile'
                }}
            />
            <ProfileStack.Screen
                name='ProfilePreferences'
                component={ProfilePreferences}
                options={{
                    title: 'Profile Preferences'
                }}
            />
            <ProfileStack.Screen
                name='ProfileDetails'
                component={ProfileDetails}
                options={{
                    title: 'Profile Details'
                }}
            />
        </ProfileStack.Navigator>
    )
}

export default Profile