import { useState } from 'react'
import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import TextElement from '../shared/TextElement'

import GlobalStyles from '../../styles/GlobalStyles'

const RecipeName = ({
    isForm,
    recipeName,
    setRecipeName
}) => {
    const { control } = useForm()
    const [ value, setValue ] = useState('')

    const handleChange = (value) => {
        setValue(value)
        setRecipeName(value)
    }

    return (
        <>
            <View style={GlobalStyles.subsectionHeader}>
                <TextElement textValue='Recipe Name' textStyle='xl' />
            </View>
            <Controller
                name='create-recipe-name'
                control={control}
                rules={{
                    required : true
                }}
                render={({field: {value}}) => {
                    return (
                        <TextInput
                            style={GlobalStyles.formInputTextField}
                            placeholder='Name'
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

export default RecipeName