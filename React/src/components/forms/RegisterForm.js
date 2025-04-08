import { useState } from 'react'
import { View, TextInput, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'

import { register } from '../../api/user/UserApi'

import PressableButton from '../sharedcomponents/PressableButton'
import GlobalStyles from '../../styles/GlobalStyles'
import LoginAndRegisterStyles from '../../styles/additionalstyles/LoginAndRegisterStyles'

const RegisterForm = () => {
    const { handleSubmit, control } = useForm()
    const [loading, isLoading] = useState(false)
    const navigation = useNavigation()

    const onSubmit = async (data) => {
        isLoading(true)
        console.log(data)
        const registerData = {
            username: data['register-username'],
            password: data['register-password'],
            birthday: data['register-birthday']
        }
        console.log(registerData)
        try {
            register(registerData)
            navigation.navigate('Home')
        } catch(error) {
            alert(error)
        } finally {
            isLoading(false)
        }
    }

    return (
        <View style={LoginAndRegisterStyles.formWrapper}>
            <Controller
                name='register-username'
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
                            placeholder='Bday'
                            onChangeText={onChange}
                            value={value}
                            onBlur={onBlur}
                        />
                    )
                }}
            />
            <View style={LoginAndRegisterStyles.submitButtonWrapper}>
                {/* <Button onPress={handleSubmit(onSubmit)} title='Register'/> */}
                <PressableButton buttonText='Register' onPressFunction={handleSubmit(onSubmit)} />
            </View>
        </View>
    )
}

export default RegisterForm