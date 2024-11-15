import { useEffect, useState } from 'react'
import { Text, View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import SelectDropdown from 'react-native-select-dropdown'

import TextElement from '../shared/TextElement'
import api from '../../api/api'

import GlobalStyles from '../../styles/GlobalStyles'
import ComponentStyles from '../../styles/additionalstyles/ComponentStyles'

const Ingredient = ({
    ingredientsList,
    ingredient
}) => {
    const { control } = useForm()
    const [ measurementUnits, setMeasurementUnits ] = useState([])

    useEffect(() => {
        getMeasurementUnits()
    }, [])

    const getMeasurementUnits = () => {
        api.get('/meal_planner_connection/measurement_units')
        .then((res) => {
            setMeasurementUnits(prevItems => [...prevItems, ...res.data])
        })
        .catch((error) => {
            alert(error)
        })
    }

    const addMeasurementUnit = (e) => {
        ingredientsList.map((item) => {
            if (ingredient.id === item.id) {
                item['measurementUnit'] = e[1]
            }
        })
    }

    const handleBlur = () => {
        ingredientsList.map((item) => {
            if (ingredient.id === item.id) {
                item['measurementQuantity'] = value
            }
        })
    }

    return (
        <View style={ComponentStyles.ingredientItemWrapper}>
            <View style={ComponentStyles.ingredientItemName}>
                <Text>{ingredient.value}</Text>
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
                    render={({field: {onChange, value}}) => {
                        return (
                            <TextInput
                                style={GlobalStyles.formInputTextField}
                                placeholder='Qty'
                                onChangeText={onChange}
                                value={value}
                                onBlur={handleBlur}
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