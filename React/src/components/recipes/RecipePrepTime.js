import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import GlobalStyles from '../../styles/GlobalStyles'

const RecipePrepTime = ({
    isForm,
    recipePrepTime,
    setRecipePrepTime
}) => {
    const { control } = useForm()

    return (
        <>
            <View style={GlobalStyles.subsectionHeader}>
                <TextElement textValue='Prep Time' textStyle='xl' textAlign='center' />
            </View>
            <Controller
                name='create-recipe-prep-time'
                control={control}
                rules={{
                    required : true
                }}
                render={({field: {onChange, value}}) => {
                    return (
                        <TextInput
                            style={GlobalStyles.formInputTextField}
                            placeholder='Time'
                            onChangeText={onChange}
                            value={value}
                            onBlur={() => {
                                setRecipePrepTime(value)
                            }}
                        />
                    )
                }}
            />
        </>
    )
}

export default RecipePrepTime