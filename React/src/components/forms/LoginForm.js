import { useState, useContext } from 'react'
import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../../authentication/AuthContext'

import { login } from '../../api/user/UserApi'

import PressableButton from '../sharedcomponents/PressableButton'
import GlobalStyles from '../../styles/GlobalStyles'
import LoginAndRegisterStyles from '../../styles/additionalstyles/LoginAndRegisterStyles'

const LoginForm = () => {
    const { setIsLoggedIn } = useContext(AuthContext)
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
            const result = await login(loginData)
            if (result?.error) {
                alert(result.error)
                return
            }
            await AsyncStorage.setItem('userToken', 'mock-token')
            setIsLoggedIn(true)
        } catch (error) {
            alert(error?.error || 'Login failed')
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