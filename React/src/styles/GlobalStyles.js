import { StyleSheet } from 'react-native'

const GlobalStyles = StyleSheet.create({
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginVertical: $spacingsmall,
    },
    formItem: {
        marginVertical: $spacingsmall,
    },
    formInputTextField: {
        backgroundColor: $white,
        borderRadius: $borderradiusbase,
        borderWidth: $borderwidthbase,
        borderStyle: 'solid',
        borderColor: $greenpale,
        paddingHorizontal: $spacingbase,
        paddingVertical: $spacinglarge,
    },
    pageContainer: {
        padding: $containerspacingbase,
        display: 'flex',
        flexDirection: 'column',
        },
    pageHeader: {
        width: '100%',
        alignItems: 'center',
        fontWeight: 'bold',
    },
    subsectionHeader: {
        marginVertical: $spacingsmall,
    },
})

export default GlobalStyles