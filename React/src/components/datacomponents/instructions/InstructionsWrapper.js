import { useEffect, useState } from 'react'
import { Pressable, View, Text } from 'react-native'

import TextElement from '../../sharedcomponents/TextElement'
import PressableButton from '../../sharedcomponents/PressableButton'
import Instruction from './Instruction'

import GlobalStyles from '../../../styles/GlobalStyles'
import ComponentStyles from '../../../styles/additionalstyles/ComponentStyles'
import RemoveItemX from '../../sharedcomponents/RemoveItemX'

const InstructionsWrapper = ({
    isForm,
    instructionsList,
    setInstructionsList
}) => {

    const addInstruction = () => {
        var instructionToAdd = {}
        if (instructionsList.length) {
            instructionToAdd['step'] = instructionsList.length + 1
        } else {
            instructionToAdd['step'] = 1
        }
        setInstructionsList(prev => [...prev, instructionToAdd])
    }

    const filterInstructionsList = (instruction) => {
        return new Promise((resolve) => {
            setInstructionsList(prev => prev.filter(item => item.step !== instruction.step))
            resolve()
        })
    }

    const updateRemainingInstructions = (stepNumber) => {
        setInstructionsList(prev =>
            prev.map((item) => {
                if (item.step > stepNumber) {
                    return {...item, step: item.step - 1}
                }
                return item
            })
        )
    }

    const handleRemoveInstruction = async (instruction) => {
        const step = instruction.step
        await filterInstructionsList(instruction)
        updateRemainingInstructions(step)
    }

    const instructionsArray = instructionsList.map(instruction => {
        return (
            <View key={instruction.step} style={ComponentStyles.arrayItemWrapper}>
                {
                    isForm ?
                    <>
                        <Instruction instruction={instruction} isForm={isForm} instructionsList={instructionsList} setInstructionsList={setInstructionsList} />
                        <RemoveItemX removeFunction={() => handleRemoveInstruction(instruction)}/>
                    </>
                    :
                    <Instruction instruction={instruction} isForm={isForm} instructionsList={instructionsList} setInstructionsList={setInstructionsList} />
                }
            </View>
        )
    })

    return (
        <>
            <View style={GlobalStyles.subsectionHeader}>
                <TextElement textValue='Instructions' textStyle='xl' />
            </View>
            {
                instructionsArray.length ?
                <>
                    {instructionsArray}
                </>
                :
                <View style={ComponentStyles.itemDefaultText}>
                    <TextElement textValue='Instructions will go here' textStyle='sm' />
                </View>
            }
            {
                isForm ?
                <PressableButton buttonText='Add another step' onPressFunction={addInstruction} />
                :
                ''
            }
        </>
    )
}

export default InstructionsWrapper