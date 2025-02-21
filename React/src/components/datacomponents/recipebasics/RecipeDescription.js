import { useState } from 'react'
import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import TextElement from '../../sharedcomponents/TextElement'

import GlobalStyles from '../../../styles/GlobalStyles'
import TextStyles from '../../../styles/additionalstyles/TextStyles'
import ComponentStyles from '../../../styles/additionalstyles/ComponentStyles'

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
            {
                isForm ?
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
                :
                <View style={[ComponentStyles.descriptionWrapper ,TextStyles.textOverflowWrap]}>
                    <TextElement textValue={recipeDescription} />
                </View>
            }
        </>
    )
}

export default RecipeDescription