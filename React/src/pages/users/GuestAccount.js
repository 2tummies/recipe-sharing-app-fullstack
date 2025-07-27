import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'

const GuestAccount = () => {
    const GuestStack = createNativeStackNavigator()
    return (
        <>
            <GuestStack.Navigator>
                <GuestStack.Screen
                    name='Login'
                    component={Login}
                />
                <GuestStack.Screen
                    name='Register'
                    component={Register}
                />
                <GuestStack.Screen
                    name='ForgotPassword'
                    component={ForgotPassword}
                />
            </GuestStack.Navigator>
        </>
    )
}

export default GuestAccount

// TODO:
// on prompting user to login if doing something like trying to save a recipe
// preserve the data and state with something like navigation params
// navigation.navigate('Login', {
//   redirectTo: 'SaveRecipe',
//   recipeId: selectedRecipe.id
// })
