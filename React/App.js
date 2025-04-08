import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import './src/styles/GlobalVariables'

import Home from './src/pages/Home'
import Profile from './src/pages/profile/Profile'
import ShareRecipes from './src/pages/sharerecipes/ShareRecipes'
import MyRecipes from './src/pages/myrecipes/MyRecipes'
import Login from './src/pages/users/Login'
import Register from './src/pages/users/Register'
import ForgotPassword from './src/pages/users/ForgotPassword'

function Logout(navigation) {
  localStorage.clear()
  navigation.navigate('Login')
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App({ navigation }) {

  const Tab = createBottomTabNavigator()
  
  const UserStack = createNativeStackNavigator()

  let isLoggedIn = false

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

export default App

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