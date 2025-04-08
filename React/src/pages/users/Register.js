import { View } from 'react-native'

import RegisterForm from '../../components/forms/RegisterForm'
import TextElement from '../../components/sharedcomponents/TextElement'

import ComponentStyles from '../../styles/additionalstyles/ComponentStyles'
import LoginAndRegisterStyles from '../../styles/additionalstyles/LoginAndRegisterStyles'

const Register = ({ navigation }) => {
    return (
        <View style={LoginAndRegisterStyles.logAndRegPage}>
            <RegisterForm />
            <View style={LoginAndRegisterStyles.extraOptionsWrapper}>
                <View style={ComponentStyles.twoAcrossItem}>
                    <TextElement textValue='Already Have an Account?' textAlign='center' />
                </View>
                <View style={ComponentStyles.twoAcrossItem}>
                <TextElement textValue='Forgot Password' textAlign='center' />
                </View>
            </View>
        </View>
    )
}

export default Register