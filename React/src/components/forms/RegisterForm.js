import { useState, useContext } from 'react'
import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { AuthContext } from '../../authentication/AuthContext'

import { register } from '../../api/user/UserApi'
import useUserData from '../../hooks/users/useUserData'
import LogoutHelper from '../../hooks/users/LogoutHelper'

import PressableButton from '../sharedcomponents/PressableButton'
import GlobalStyles from '../../styles/GlobalStyles'
import LoginAndRegisterStyles from '../../styles/additionalstyles/LoginAndRegisterStyles'

const RegisterForm = () => {
    const { setIsLoggedIn } = useContext(AuthContext)
    const { handleSubmit, control } = useForm({
        defaultValues: {
            'register-username': '',
            'register-password': ''
        }
    })
    const [loading, setLoading] = useState(false)
    const persistUserData = useUserData()
    const logout = async () => {
        await LogoutHelper({setUserId, setUsername, setIsLoggedIn})
    }

    const onSubmit = async (data) => {
        setLoading(true)
        const registerData = {
            username: data['register-username'],
            password: data['register-password']
        }
        try {
            response = await register(registerData)
            console.log(response)
            await persistUserData(response)
            setIsLoggedIn(true)
        } catch(error) {
            alert(error)
            setIsLoggedIn(false)
            await logout()
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={LoginAndRegisterStyles.formWrapper}>
            <Controller
                name='register-username'
                control={control}
                defaultValue='Username'
                rules={{
                    required : true
                }}
                render={({field: {onChange, onBlur, value}}) => {
                    return (
                        <TextInput
                            style={[GlobalStyles.formInputTextField, LoginAndRegisterStyles.textField]}
                            placeholder='Username'
                            onChangeText={onChange}
                            value={value}
                            onBlur={onBlur}
                        />
                    )
                }}
            />
            <Controller
                name='register-password'
                control={control}
                rules={{
                    required : true
                }}
                render={({field: {onChange, onBlur, value}}) => {
                    return (
                        <TextInput
                            style={[GlobalStyles.formInputTextField, LoginAndRegisterStyles.textField]}
                            placeholder='Password'
                            onChangeText={onChange}
                            value={value}
                            onBlur={onBlur}
                            secureTextEntry={true}
                            autoCapitalize='none'
                        />
                    )
                }}
            />
            <Controller
                name='register-birthday'
                control={control}
                render={({field: {onChange, onBlur, value}}) => {
                    return (
                        <TextInput
                            style={[GlobalStyles.formInputTextField, LoginAndRegisterStyles.textField]}
                            placeholder='Birthday'
                            onChangeText={onChange}
                            value={value}
                            onBlur={onBlur}
                        />
                    )
                }}
            />
            <View style={LoginAndRegisterStyles.submitButtonWrapper}>
                <PressableButton buttonText='Register' onPressFunction={handleSubmit(onSubmit)} />
            </View>
        </View>
    )
}

export default RegisterForm