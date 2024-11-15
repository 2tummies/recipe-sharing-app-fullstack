import { useState } from 'react'
import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import TextElement from '../../sharedcomponents/TextElement'

import GlobalStyles from '../../../styles/GlobalStyles'

const RecipeDescription = ({
    isForm,
    recipeDescription,
    setRecipeDescription
}) => {
    const { control } = useForm()
    const [ value, setValue ] = useState('')

    const handleChange = (value) => {
        setValue(value)
        setRecipeDescription(value)
    }
    
    return (
        <>
            <View style={GlobalStyles.subsectionHeader}>
                <TextElement textValue='Recipe Description' textStyle='xl' />
            </View>
            <Controller
                name='create-recipe-description'
                control={control}
                rules={{
                    required : true
                }}
                render={({field: {value}}) => {
                    return (
                        <TextInput
                            style={GlobalStyles.formInputTextField}
                            placeholder='Description'
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

export default RecipeDescription