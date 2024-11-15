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
                render={({field: {onChange, value}}) => {
                    return (
                        <TextInput
                            style={GlobalStyles.formInputTextField}
                            placeholder='Name'
                            onChangeText={onChange}
                            value={value}
                            onBlur={() => {
                                setRecipeName(value)
                            }}
                        />
                    )
                }}
            />
        </>
    )
}

export default RecipeName