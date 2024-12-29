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
            {
                isForm ?
                <>
                    <View style={GlobalStyles.subsectionHeader}>
                        <TextElement textValue='Cook Time' textStyle='xl' textAlign='center' />
                    </View>
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