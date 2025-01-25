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
        if (isForm) {
            fetchMeasurementUnits()
        }
    }, [])

    const addMeasurementUnit = (e) => {
        ingredientsList.map((item) => {
            if (ingredient.id === item.id) {
                item['measurement_unit_name'] = e[1]
                item['measurement_unit_id'] = e[0]
            }
        })
    }

    const handleChange = (value) => {
        setValue(value)
        ingredientsList.map((item) => {
            if (ingredient.id === item.id) {
                item['measurement_unit_qty'] = value
            }
        })
    }

    return (
        <View style={ComponentStyles.ingredientItemWrapper}>
            {
                isForm ?
                <>
                    <View style={ComponentStyles.ingredientItemName}>
                        <Text>{ingredient.name}</Text>
                    </View>
                    <View style={ComponentStyles.ingredientItemMeasurementUnitWrapper}>
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
                    </View>
                </>
                :
                <>
                    <View style={ComponentStyles.ingredientItemMeasurementUnitWrapper}>
                        <View>
                            <TextElement textValue={ingredient.measurement_unit_quantity} />
                        </View>
                        <View>
                            <TextElement textValue={ingredient.measurement_unit_name} />
                        </View>
                    </View>
                    <View>
                        <Text>{ingredient.name}</Text>
                    </View>
                    {/* <Text>{ingredient.caloric_value}</Text> */}
                </>
            }
        </View>
    )
}

export default Ingredient