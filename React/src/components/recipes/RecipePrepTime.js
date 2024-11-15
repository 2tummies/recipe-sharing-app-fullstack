import { useState } from 'react'
import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import TextElement from '../shared/TextElement'

import GlobalStyles from '../../styles/GlobalStyles'

const RecipePrepTime = ({
    isForm,
    recipePrepTime,
    setRecipePrepTime
}) => {
    const { control } = useForm()
    const [ value, setValue ] = useState('')

    const handleChange = (value) => {
            setValue(value)
            setRecipePrepTime(value)
    }

    return (
        <>
            <View style={GlobalStyles.subsectionHeader}>
                <TextElement textValue='Prep Time' textStyle='xl' textAlign='center' />
            </View>
            <Controller
                name='create-recipe-prep-time'
                control={control}
                rules={{
                    required : true
                }}
                render={({field: {value}}) => {
                    return (
                        <TextInput
                            style={GlobalStyles.formInputTextField}
                            placeholder='Time'
                            onChangeText={handleChange}
                            value={value}
                            required
                        />
                    )
                }}
            />
        </>
    )
}

export default RecipePrepTime