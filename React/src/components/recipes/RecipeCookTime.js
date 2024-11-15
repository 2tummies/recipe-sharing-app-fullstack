import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import TextElement from '../shared/TextElement'

import GlobalStyles from '../../styles/GlobalStyles'

const RecipeCookTime = ({
    isForm,
    recipeCookTime,
    setRecipeCookTime
}) => {
    const { control } = useForm()

    return (
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
                render={({field: {onChange, value}}) => {
                    return (
                        <TextInput
                            style={GlobalStyles.formInputTextField}
                            placeholder='Time'
                            onChangeText={onChange}
                            value={value}
                            onBlur={() => {
                                setRecipeCookTime(value)
                            }}
                        />
                    )
                }}
            />
        </>
    )
}

export default RecipeCookTime