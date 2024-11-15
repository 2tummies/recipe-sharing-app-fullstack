import {  useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import SelectDropdown from 'react-native-select-dropdown'

import TextElement from '../shared/TextElement'
import AdditionalToolSection from './AdditionalToolsSection'
import { getAllAdditionalTools } from '../../api/calls/AdditionalToolsApi'

import GlobalStyles from '../../styles/GlobalStyles'
import ComponentStyles from '../../styles/additionalstyles/ComponentStyles'

const AdditionalToolsWrapper = ({
    isForm,
    additionalToolsList,
    handleAddAdditionalTool,
    handleRemoveAdditionalTool
}) => {
    const { control } = useForm()
    const [ additionalTools, setAdditionalTools ] = useState([])
    
    const dupeException = 'Already added'

    useEffect(() => {
        const fetchAdditionalTools = async () => {
            const fetchedAdditionalTools = await getAllAdditionalTools()
            setAdditionalTools(fetchedAdditionalTools) 
        }
        fetchAdditionalTools()
    }, [])

    const addAdditionalTool = (e) => {
        if (!additionalToolsList.includes(e)) {
            handleAddAdditionalTool(e)
        } else {
            throw dupeException
        }
    }

    return (
        <>
            <View style={GlobalStyles.subsectionHeader}>
                <TextElement textValue='Additional Tools' textStyle='xl' />
            </View>
            <AdditionalToolSection
                isForm={isForm}
                additionalToolsList={additionalToolsList}
                handleRemoveAdditionalTool={handleRemoveAdditionalTool}
            />
            <Controller
                name='create-additional-tools-list'
                control={control}
                render={({ field: { onChange, value=[] } }) => {
                    return (
                        <SelectDropdown
                            data={additionalTools}
                            onSelect={(selectedItem, index) => {
                                addAdditionalTool(selectedItem)
                                onChange([...value, selectedItem])
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={ComponentStyles.pressableButtonBubbled}>
                                        <TextElement textValue='Add Additional Tools' />
                                    </View>
                                )
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <>
                                        <Text>{item[1]}</Text>
                                    </>
                                )
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    )
                }}
            />
        </>
    )
}

export default AdditionalToolsWrapper