import { useState } from 'react'
import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import TextElement from '../shared/TextElement'

import GlobalStyles from '../../styles/GlobalStyles'

const RecipeCookTime = ({
    isForm,
    recipeCookTime,
    setRecipeCookTime
}) => {
    const { control } = useForm()
    const [ value, setValue ] = useState('')

    const handleChange = (value) => {
        setValue(value)
        setRecipeCookTime(value)
    }

    return (
        <>
            <View style={GlobalStyles.subsectionHeader}>
                <TextElement textValue='Cook Time' textStyle='xl' textAlign='center' />
            </View>
            <Controller
                name='create-recipe-cook-time'
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

export default RecipeCookTime