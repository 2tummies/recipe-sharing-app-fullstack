from django.db import connection
from django.http import JsonResponse

def get_ingredients_list():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM ingredients;")
        rows = cursor.fetchall()
    return JsonResponse(rows, safe=False)

def get_ingredients_for_recipe(recipeId):
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT recipe_ingredient.ingredient_id, ingredient_name, ingredient_caloric_value, measurement_units.measurement_unit_id, measurement_unit_name, measurement_quantity FROM recipes " +
            "JOIN recipe_ingredient ON recipe_ingredient.recipe_id = recipes.recipe_id " +
            "JOIN ingredients ON ingredients.ingredient_id = recipe_ingredient.ingredient_id " +
            "JOIN measurement_units ON measurement_units.measurement_unit_id = recipe_ingredient.measurement_unit_id " +
            "WHERE recipes.recipe_id = %s;",
            [recipeId]
        )
        recipe_ingredients = cursor.fetchall()
        recipe_ingredients_data = []
        if recipe_ingredients:
            for ingredient in recipe_ingredients:
                ingredient_data = {
                    'id': ingredient[0],
                    'name': ingredient[1],
                    'caloric_value': ingredient[2],
                    'measurement_unit_id': ingredient[3],
                    'measurement_unit_name': ingredient[4],
                    'measurement_unit_quantity': ingredient[5],
                }
                recipe_ingredients_data.append(ingredient_data)
        return recipe_ingredients_data