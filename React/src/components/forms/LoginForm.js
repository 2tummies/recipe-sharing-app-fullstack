import { useState } from 'react'
import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import { login } from '../../api/user/UserApi'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants'

import PressableButton from '../sharedcomponents/PressableButton'
import GlobalStyles from '../../styles/GlobalStyles'
import LoginAndRegisterStyles from '../../styles/additionalstyles/LoginAndRegisterStyles'

const LoginForm = ({ navigation }) => {
    const { handleSubmit, control } = useForm()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, isLoading] = useState(false)

    const handleUsername = (value) => {
        setUsername(value)
    }

    const handlePassword = (value) => {
        setPassword(value)
    }

    const onSubmit = async () => {
        isLoading(true)
        // data.preventDefault()
        const loginData = {
            username: username,
            password: password,
        }
        try {
            // const res = await api.post(route, {username, password})
            login(loginData)
            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
            navigation.navigate('Home')
        } catch (error) {
            alert(error)
        } finally {
            isLoading(false)
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
                render={({field: {onBlur, value}}) => {
                    return (
                        <TextInput
                            style={[GlobalStyles.formInputTextField, LoginAndRegisterStyles.textField]}
                            placeholder='Username'
                            onChangeText={handleUsername}
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
                            onChangeText={handlePassword}
                            value={value}
                            onBlur={onBlur}
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