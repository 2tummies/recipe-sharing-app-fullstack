import { useState } from 'react'
import { View, TextInput, Text } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import TextElement from '../../sharedcomponents/TextElement'

import GlobalStyles from '../../../styles/GlobalStyles'

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
            {
                isForm ?
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
                :
                <>
                    {/* <TextElement textValue={recipeCookTime} /> */}
                    {/* #TODO: Figure out why this causes an error and put back in */}
                    <Text>Cook Time placeholder</Text>
                </>
            }
        </>
    )
}

export default RecipeCookTime