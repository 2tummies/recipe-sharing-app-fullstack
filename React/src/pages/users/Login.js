import { View } from 'react-native'

import LoginForm from '../../components/forms/LoginForm'
import TextElement from '../../components/sharedcomponents/TextElement'
import PressableButton from '../../components/sharedcomponents/PressableButton'

import LoginAndRegisterStyles from '../../styles/additionalstyles/LoginAndRegisterStyles'
import ComponentStyles from '../../styles/additionalstyles/ComponentStyles'

const Login = ({ navigation }) => {
    
    const newUserNavigate = () => {
        navigation.navigate('Register')
    }

    return (
        <>
            <View style={LoginAndRegisterStyles.logAndRegPage}>
                <LoginForm />
                <View style={LoginAndRegisterStyles.extraOptionsWrapper}>
                    <View style={ComponentStyles.twoAcrossItem}>
                        <TextElement textValue='Forgot Password' textAlign='center' />
                    </View>
                    <View style={ComponentStyles.twoAcrossItem}>
                        <PressableButton buttonText='Create New User' onPressFunction={newUserNavigate} />
                    </View>
                </View>
            </View>
        </>
    )
}

export default Login