import { useState } from 'react'
import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import TextElement from '../../sharedcomponents/TextElement'

import GlobalStyles from '../../../styles/GlobalStyles'
import ComponentStyles from '../../../styles/additionalstyles/ComponentStyles'

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
            {
                isForm ?
                <>
                    <View style={GlobalStyles.subsectionHeader}>
                        <TextElement textValue='Prep Time' textStyle='xl' textAlign='center' />
                    </View>
                    <View style={ComponentStyles.recipeTimeWrapper}>
                        <Controller
                            name='create-recipe-prep-time'
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
                </>
                :
                <>
                    <TextElement textValue={recipePrepTime} />
                </>
            }
        </>
    )
}

export default RecipePrepTime