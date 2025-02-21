import { useState } from 'react'
import { View, TextInput, Text } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import TextElement from '../../sharedcomponents/TextElement'

import GlobalStyles from '../../../styles/GlobalStyles'
import ComponentStyles from '../../../styles/additionalstyles/ComponentStyles'

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
            {
                isForm ?
                <View style={ComponentStyles.recipeTimeWrapper}>
                    <Controller
                        name='create-recipe-cook-time'
                        control={control}
                        rules={{
                            required : true
                        }}
                        render={({field: {value}}) => {
                            return (
                                <TextInput
                                    style={[GlobalStyles.formInputTextField, ComponentStyles.recipeTimeItem]}
                                    placeholder='Time'
                                    onChangeText={handleChange}
                                    value={value}
                                    required
                                />
                            )
                        }}
                    />
                    <View style={ComponentStyles.recipeTimeLabel}>
                        <TextElement textValue={'mins'} textAlign={'center'} />
                    </View>
                </View>
                :
                <View style={ComponentStyles.recipeTimeWrapper}>
                    <TextElement textValue={recipeCookTime} />
                    <View style={ComponentStyles.recipeTimeLabel}>
                        <TextElement textValue={'mins'} textAlign={'center'} />
                    </View>
                </View>
            }
        </>
    )
}

export default RecipeCookTime