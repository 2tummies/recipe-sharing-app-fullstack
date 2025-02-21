import { useState, useEffect } from 'react'
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
    const [ prepExists, setPrepExists ] = useState(false)

    useEffect(() => {
        const handlePrepTime = () => {
            if (recipePrepTime && recipePrepTime > 0) {
                setPrepExists(true)
            }
        }

        handlePrepTime()
    }, [])

    const handleChange = (value) => {
        setValue(value)
        setRecipePrepTime(value)
    }

    return (
        <>
            <View style={GlobalStyles.subsectionHeader}>
                <TextElement textValue='Prep Time' textStyle='xl' textAlign='center' />
            </View>
            {
                isForm ?
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
                :
                <View style={ComponentStyles.recipeTimeWrapper}>
                    {
                        prepExists ?
                        <>
                            <TextElement textValue={recipePrepTime} />
                            <View style={ComponentStyles.recipeTimeLabel}>
                                <TextElement textValue={'mins'} textAlign={'center'} />
                            </View>
                        </>
                        :
                        <>
                            <TextElement textValue={'No prep time'} textAlign={'center'} />
                        </>
                    }
                </View>
            }
        </>
    )
}

export default RecipePrepTime