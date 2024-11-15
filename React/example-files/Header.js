import { StyleSheet, View, Text } from 'react-native';

const Header = () => {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText}>My First React Native App</Text>
                <Text style={styles.headerSubText}>By 2tummies</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: '18px',
        color: '#deffd0',
        textAlign: 'center',
    },
    headerSubText: {
        fontSize: '12px',
        color: '#deffd0',
        textAlign: 'center',
    },
})

export default Header