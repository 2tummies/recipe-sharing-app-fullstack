import React, { useContext } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AuthContext } from './authentication/AuthContext'

import './styles/GlobalVariables'

import Home from './pages/Home'
import Profile from './pages/profile/Profile'
import ShareRecipes from './pages/sharerecipes/ShareRecipes'
import MyRecipes from './pages/myrecipes/MyRecipes'
import Login from './pages/users/Login'
import Register from './pages/users/Register'
import ForgotPassword from './pages/users/ForgotPassword'

function MainNav({ navigation }) {
    const { isLoggedIn } = useContext(AuthContext)
    const Tab = createBottomTabNavigator()
    const UserStack = createNativeStackNavigator()

    if (isLoggedIn === null) return null
    
    return (
      <NavigationContainer theme={MyTheme}>
        {isLoggedIn ?
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarLabelStyle: {
                fontSize: $fontsizesmall,
                fontFamily: $fontfamily
              }
            }}
          >
            <Tab.Screen
              name='Home'
              component={Home}
              options={{
                title: 'Home Page'
              }}
            />
            <Tab.Screen
              name='ShareRecipes'
              component={ShareRecipes}
              options={{
                title: 'Share Recipes'
              }}
            />
            <Tab.Screen
              name='MyRecipes'
              component={MyRecipes}
              options={{
                title: 'My Recipes'
              }}
            />
            <Tab.Screen
              name='Profile'
              component={Profile}
              options={{
                title: 'Profile'
              }}
            />
          </Tab.Navigator>
        :
          <UserStack.Navigator>
              <UserStack.Screen
                  name='Login'
                  component={Login}
              />
              <UserStack.Screen
                  name='Register'
                  component={Register}
              />
              <UserStack.Screen
                  name='ForgotPassword'
                  component={ForgotPassword}
              />
          </UserStack.Navigator>
        }
      </NavigationContainer>
    )
}

export default MainNav

const MyTheme = {
  colors: {
    primary: $greendarkforest,
    background: $greenpale,
    card: $greenlight,
    text: $greendarkforest,
  },
  fonts: {
      regular: {
        fontFamily: $fontfamily
      }
  }
}