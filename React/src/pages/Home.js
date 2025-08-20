import { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { AuthContext } from '../authentication/AuthContext'

const Home = () => {
    const { isLoggedIn, userId, username } = useContext(AuthContext)

    return (
        <>
            {isLoggedIn ?
                    <View style={styles.tempStyle}>
                        <Text>Welcome, {username}</Text>
                        <Text>user_id: {userId}</Text>
                    </View>
                :
                    <View style={styles.tempStyle}>
                        <Text>Welcome, Guest; make an acc</Text>
                    </View>
            }
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    tempStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})