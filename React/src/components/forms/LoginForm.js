import { useState } from 'react'
import { View, Text } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import api from '../../api/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants'

import PressableButton from '../shared/PressableButton'

const LoginForm = ({ navigation }) => {
    const { handleSubmit, control } = useForm()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, isLoading] = useState(false)

    const onSubmit = async (data) => {
        isLoading(true)
        data.preventDefault()

        try {
            const res = await api.post(route, {username, password})
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
        <View>
            <Controller
                name= 'login-username'
                control={control}
                rules={{
                    required : true
                }}
                render={({field: {onChange, onBlur, value}}) => {
                    return (
                        <TextInput
                            placeholder='Username'
                            onChangeText={onChange}
                            value={value}
                            onBlur={onBlur}
                        />
                    )
                }}
            />
            <Controller
                name= 'login-password'
                control={control}
                rules={{
                    required : true
                }}
                render={({field: {onChange, onBlur, value}}) => {
                    return (
                        <TextInput
                            onChangeText={onChange}
                            value={value}
                            onBlur={onBlur}
                        />
                    )
                }}
            />
            <PressableButton buttonText='Login' onPressFunction={handleSubmit(onSubmit)} />
        </View>
    )
}

export default LoginForm