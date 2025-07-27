import { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AuthContext } from './authentication/AuthContext'

import './styles/GlobalVariables'

import Home from './pages/Home'
import Profile from './pages/profile/Profile'
import ShareRecipes from './pages/sharerecipes/ShareRecipes'
import MyRecipes from './pages/myrecipes/MyRecipes'
import GuestAccount from './pages/users/GuestAccount'

function MainNav({ navigation }) {
    const { isLoggedIn } = useContext(AuthContext)
    const Tab = createBottomTabNavigator()

    if (isLoggedIn === null) return null
    
    return (
      <NavigationContainer theme={MyTheme}>
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
                title: 'Home'
              }}
            />
            <Tab.Screen
              name='ShareRecipes'
              component={ShareRecipes}
              options={{
                title: 'Find Recipes'
              }}
            />
            {isLoggedIn ?
              <>
                <Tab.Screen
                  name='MyRecipes'
                  component={MyRecipes}
                  options={{
                    title: 'Saved Recipes'
                  }}
                />
                <Tab.Screen
                  name='Profile'
                  component={Profile}
                  options={{
                    title: 'Profile'
                  }}
                />
              </>
            :
              <>
                <Tab.Screen
                  name='Account'
                  component={GuestAccount}
                  options={{
                    title: 'Account'
                  }}
                />
              </>
            }
          </Tab.Navigator>
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