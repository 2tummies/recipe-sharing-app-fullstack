import { useState } from 'react'
import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import TextElement from '../../sharedcomponents/TextElement'

import GlobalStyles from '../../../styles/GlobalStyles'
import ComponentStyles from '../../../styles/additionalstyles/ComponentStyles'

const Instruction = ({
    isForm,
    instruction,
    setInstructionsList
}) => {
    const { control } = useForm()
    const [ value, setValue ] = useState('')

    const handleChange = (value, step) => {
        setValue(value)
        setInstructionsList(prev => 
            prev.map(item => {
                if (item.step === step) {
                    return {step: item.step, text: value}
                }
                return item
            })
        )
    }

    return (
        <>
            {
                isForm ?
                <View style={ComponentStyles.instructionItemWrapper}>
                    <View style={ComponentStyles.instructionItemStep}>
                        <TextElement textValue={instruction.step + '.'} />
                    </View>
                    <Controller
                        name='create-recipe-instruction-step'
                        control={control}
                        rules={{
                            required : true
                        }}
                        render={() => {
                            return (
                                <TextInput
                                    style={[GlobalStyles.formInputTextField, ComponentStyles.instructionItemText]}
                                    placeholder='Text here'
                                    onChangeText={(text) => handleChange(text, instruction.step)}
                                    value={instruction.text}
                                    required
                                />
                            )
                        }}
                    />
                </View>
                :
                <View style={ComponentStyles.instructionItem}>
                    <View>
                        <TextElement textValue={instruction.step} />
                    </View>
                    <View>
                        <TextElement textValue={instruction.text} />
                    </View>
                </View>
            }
        </>
    )
}

export default Instruction