import json
import os
import psycopg2

from database.databaseconfig import config

json_file_path = os.path.join('FoodData_Central_foundation_food_json_2024-04-18', 'foundationDownload.json')

with open(json_file_path, 'r') as json_file:
    data = json.load(json_file)

def createInitialIngredientList():
    initialIngredientList = []
    for food in data['FoundationFoods']:
        kcalAmount = 0
        for nutrient in food['foodNutrients']:
            if nutrient['nutrient']['unitName'] == 'kcal':
                kcalAmount = nutrient['amount']
        initialIngredient = [food['description'], kcalAmount]
        initialIngredientList.append(initialIngredient)
    with open('initial_ingredient_list.json', 'w') as json_file:
        json.dump(initialIngredientList, json_file)

def createExhaustiveNutrientList():
    exhaustiveNutrientList = {}
    for food in data['FoundationFoods']:
        for nutrient in food['foodNutrients']:
            if nutrient['nutrient']['name'] not in exhaustiveNutrientList:
                exhaustiveNutrientList[nutrient['nutrient']['number']] = nutrient['nutrient']['name']
    with open('exhaustive_nutrient_list.json', 'w') as json_file:
        json.dump(exhaustiveNutrientList, json_file)

def createExhaustiveIngredientList():
    ingredientList = []
    for food in data['FoundationFoods']:
        ingredientItem = {}
        ingredientItem['ingredient_name'] = food['description']
        ingredientNutrients = []
        for nutrient in food['foodNutrients']:
            foodNutrient = {}
            if 'amount' in nutrient:
                foodNutrient['nutrient_amount'] = nutrient['amount']
            else:
                foodNutrient['nutrient_amount'] = 0
            foodNutrient['nutrient_id'] = nutrient['nutrient']['id']
            foodNutrient['nutrient_name'] = nutrient['nutrient']['name']
            foodNutrient['nutrient_unit_name'] = nutrient['nutrient']['unitName']
            ingredientNutrients.append(foodNutrient)
        ingredientItem['ingredient_nutrients'] = ingredientNutrients
        ingredientList.append(ingredientItem)
    with open('exhaustive_ingredient_list.json', 'w') as json_file:
        json.dump(ingredientList, json_file)

def createExhaustiveNutrientNumberList():
    differentNumbers = []
    for food in data['FoundationFoods']:
        for nutrient in food['foodNutrients']:
            if nutrient['nutrient']['number'] not in differentNumbers:
                differentNumbers.append(nutrient['nutrient']['number'])
    differentNumbers.sort()
    with open('exhaustive_nutrient_number_list.json', 'w') as json_file:
        json.dump(differentNumbers, json_file)

def populateIngredientsToDB():
    connection = None
    try:
        params = config()
        connection = psycopg2.connect(**params)
        crsr = connection.cursor()
        try:
            file = open('initial_ingredient_list.json')
            data = json.load(file)
            for entry in data:
                crsr.execute(
                    "INSERT INTO ingredients (ingredient_id, ingredient_name, ingredient_caloric_value) VALUES (DEFAULT, %s, %s);",
                    [entry[0], entry[1]]
                    )
            connection.commit()
        except(Exception) as error:
            print(error)
        finally:
            print('items should be added to db')
            crsr.close()
    except(Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if connection is not None:
            connection.close()

def main():
    val = input('0-close, 1-create nutrient list json, 2-create ingredient list json, 3-create initial ingredient list json, 4-populate ingredients into db: ')
    if val == '1':
        createExhaustiveNutrientList()
    elif val == '2':
        createExhaustiveIngredientList()
    elif val == '3':
        createInitialIngredientList()
    elif val == '4':
        populateIngredientsToDB()
    else:
        print("Good day")

if __name__ == "__main__":
    main()