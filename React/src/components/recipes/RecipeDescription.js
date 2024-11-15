import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import TextElement from '../shared/TextElement'

import GlobalStyles from '../../styles/GlobalStyles'

const RecipeDescription = ({
    isForm,
    recipeDescription,
    setRecipeDescription
}) => {
    const { control } = useForm()
    
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
                render={({field: {onChange, onBlur, value}}) => {
                    return (
                        <TextInput
                            style={GlobalStyles.formInputTextField}
                            placeholder='Description'
                            onChangeText={onChange}
                            value={value}
                            onBlur={() => {
                                setRecipeDescription(value)
                            }}
                            required
                        />
                    )
                }}
            />
        </>
    )
}

export default RecipeDescription