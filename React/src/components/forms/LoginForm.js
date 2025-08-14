import { useState, useContext } from 'react'
import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import useLogin from '../../hooks/users/useLogin'

import PressableButton from '../sharedcomponents/PressableButton'
import GlobalStyles from '../../styles/GlobalStyles'
import LoginAndRegisterStyles from '../../styles/additionalstyles/LoginAndRegisterStyles'

const LoginForm = () => {
    const login = useLogin()
    const { handleSubmit, control } = useForm({
        defaultValues: {
            'login-username': '',
            'login-password': ''
        }
    })
    const [ loading, setLoading ] = useState(false)

    const onSubmit = async (data) => {
        setLoading(true)
        const loginData = {
            username: data['login-username'],
            password: data['login-password'],
        }
        try {
            await login(loginData)
        } catch (e) {
            console.warn('Error logging in: ', e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={LoginAndRegisterStyles.formWrapper}>
            <Controller
                name='login-username'
                control={control}
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
                name='login-password'
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
            <View style={LoginAndRegisterStyles.submitButtonWrapper}>
                <PressableButton buttonText='Login' onPressFunction={handleSubmit(onSubmit)} />
            </View>
        </View>
    )
}

export default LoginForm