import {  useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import SelectDropdown from 'react-native-select-dropdown'

import TextElement from '../../sharedcomponents/TextElement'
import CookingMethodsSection from './CookingMethodsSection'
import { getAllCookingMethods } from '../../../api/calls/CookingMethodsApi'

import GlobalStyles from '../../../styles/GlobalStyles'
import ComponentStyles from '../../../styles/additionalstyles/ComponentStyles'

const CookingMethodsWrapper = ({
    isForm,
    cookingMethodsList,
    handleAddCookingMethod,
    handleRemoveCookingMethod
}) => {
    const { control } = useForm()
    const [ cookingMethods, setCookingMethods ] = useState([])

    const dupeException = 'Already added'

    useEffect(() => {
        const fetchCookingMethods = async () => {
            const fetchedCookingMethods = await getAllCookingMethods()
            setCookingMethods(fetchedCookingMethods) 
        }
        fetchCookingMethods()
    }, [])

    const addCookingMethod = (e) => {
        if (!cookingMethodsList.includes(e)) {
            handleAddCookingMethod(e)
        } else {
            throw dupeException
        }
    }

    return (
        <>
            <View style={GlobalStyles.subsectionHeader}>
                <TextElement textValue='Cooking Method(s)' textStyle='xl' />
            </View>
            <CookingMethodsSection
                isForm={isForm}
                cookingMethodsList={cookingMethodsList}
                handleRemoveCookingMethod={handleRemoveCookingMethod}
            />
            <Controller
                name='create-recipe-cooking-method-list'
                control={control}
                rules={{
                    required: true
                }}
                render={({ field: { onChange, value=[] } }) => {
                    return (
                        <SelectDropdown
                            data={cookingMethods}
                            onSelect={(selectedItem, index) => {
                                addCookingMethod(selectedItem)
                                onChange([...value, selectedItem])
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={ComponentStyles.pressableButtonBubbled}>
                                        <TextElement textValue='Add Cooking Method' />
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

export default CookingMethodsWrapper