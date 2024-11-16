import { useEffect, useState } from 'react'
import { Text, View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import SelectDropdown from 'react-native-select-dropdown'

import TextElement from '../../sharedcomponents/TextElement'
import { getAllMeasurementUnits } from '../../../api/calls/MeasurementUnitsApi'

import GlobalStyles from '../../../styles/GlobalStyles'
import ComponentStyles from '../../../styles/additionalstyles/ComponentStyles'

const Ingredient = ({
    isForm,
    ingredientsList,
    ingredient
}) => {
    const { control } = useForm()
    const [ value, setValue ] = useState('')
    const [ measurementUnits, setMeasurementUnits ] = useState([])

    useEffect(() => {
        const fetchMeasurementUnits = async () => {
            const fetchedMeasurementUnits = await getAllMeasurementUnits()
            setMeasurementUnits(fetchedMeasurementUnits) 
        }
        fetchMeasurementUnits()
    }, [])

    const addMeasurementUnit = (e) => {
        ingredientsList.map((item) => {
            if (ingredient.ingredient_id === item.ingredient_id) {
                item['measurementUnit'] = e[1]
            }
        })
    }

    const handleChange = (value) => {
        setValue(value)
        ingredientsList.map((item) => {
            if (ingredient.ingredient_id === item.ingredient_id) {
                item['measurementQuantity'] = value
            }
        })
    }

    return (
        <View style={ComponentStyles.ingredientItemWrapper}>
            <View style={ComponentStyles.ingredientItemName}>
                <Text>{ingredient.ingredient_value}</Text>
            </View>
            <View style={ComponentStyles.ingredientItemMeasurementUnitWrapper}>
                <Controller
                    name='create-recipe-ingredient-measurement-unit'
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <SelectDropdown
                                data={measurementUnits}
                                onSelect={(selectedItem, index) => {
                                    addMeasurementUnit(selectedItem)
                                    onChange(selectedItem)
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={ComponentStyles.ingredientItemMeasurementUnitButton}>
                                            {
                                                selectedItem ?
                                                <TextElement textValue={selectedItem[1]} />
                                                :
                                                <TextElement textValue='Units' />
                                            }
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
                <Controller
                    name='create-recipe-ingredient-measurement-quantity'
                    control={control}
                    rules={{
                        required : true
                    }}
                    render={({field: {value}}) => {
                        return (
                            <TextInput
                                style={GlobalStyles.formInputTextField}
                                placeholder='Qty'
                                onChangeText={handleChange}
                                value={value}
                                required
                            />
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default Ingredient