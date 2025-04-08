import { StyleSheet } from 'react-native'

const LoginAndRegisterStyles = StyleSheet.create({
    logAndRegPage: {
        height: '100%',
        // width: '100%',
        backgroundColor: $greenpale,
        padding: $containerspacingbase,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textField: {
        width: '80%',
        marginVertical: $spacingsmall
    },
    submitButtonWrapper: {
        width: '50%',
        marginVertical: $spacingsmall
    },
    extraOptionsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: $spacingextralarge
    },
})

export default LoginAndRegisterStyles