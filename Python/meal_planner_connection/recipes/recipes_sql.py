from django.db import connection
from django.http import JsonResponse

from ..recipe_tags import recipe_tags_sql
from ..ingredients import ingredients_sql
from ..cooking_methods import cooking_methods_sql
from ..additional_tools import additional_tools_sql

def get_shared_recipes_list():
    with connection.cursor() as cursor:
        cursor.execute("SELECT recipe_id, recipe_name, recipe_description FROM recipes WHERE is_shared = TRUE;")
        rows = cursor.fetchall()
    return JsonResponse(rows, safe=False)

def get_recipe_basics(id):
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT recipe_name, recipe_description, recipe_cook_time, recipe_prep_time, recipe_instructions FROM recipes " + 
            "WHERE recipes.recipe_id = %s;",
            [id]
        )
        return cursor.fetchone()
    
def get_recipe_instructions(id):
    recipe_ingredients = []
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT recipe_instructions FROM recipes " + 
            "WHERE recipes.recipe_id = %s;",
            [id]
        )
        data = cursor.fetchone()
        for data_piece in data[0]:
            recipe_ingredients.append(data_piece)
        return recipe_ingredients

def get_shared_recipe_by_id(id):
    try:
        recipe_basics = get_recipe_basics(id)
        recipe_instructions = get_recipe_instructions(id)
        recipe_tags_data = recipe_tags_sql.get_recipe_tags_for_recipe(id)
        recipe_ingredients_data = ingredients_sql.get_ingredients_for_recipe(id)
        recipe_cooking_methods_data = cooking_methods_sql.get_cooking_methods_for_recipe(id)
        recipe_additional_tools_data = additional_tools_sql.get_additional_tools_for_recipe(id)
        if recipe_basics is not None and recipe_ingredients_data:
            recipe_data = {
                'recipe_name': recipe_basics[0],
                'recipe_description': recipe_basics[1],
                'recipe_cook_time': recipe_basics[2],
                'recipe_prep_time': recipe_basics[3],
                'recipe_instructions': recipe_instructions,
                'recipe_tags': recipe_tags_data,
                'recipe_cooking_methods': recipe_cooking_methods_data,
                'recipe_additional_tools': recipe_additional_tools_data,
                'recipe_ingredients': recipe_ingredients_data

            }
            return JsonResponse(recipe_data)
    except Exception:
        connection.rollback()
        return JsonResponse({'error': 'Recipe not found'}, status=404)

def add_new_recipe(recipe):
    with connection.cursor() as cursor:
        try:
            recipe_instructions = []
            for instruction in recipe['recipe_instructions']:
                recipe_instructions.append(instruction['text'])
            cursor.execute(
                "INSERT INTO recipes (recipe_id, recipe_name, recipe_description, " +
                "recipe_cook_time, recipe_prep_time, recipe_instructions) " +
                "VALUES (DEFAULT, %s, %s, %s, %s, %s) RETURNING recipe_id;",
                [recipe['recipe_name'], recipe['recipe_description'], recipe['recipe_cook_time'], recipe['recipe_prep_time'], recipe_instructions]
            )
            recipe_id = cursor.fetchone()[0]
            ingredients_sql.add_recipe_ingredients(cursor, recipe_id, recipe['recipe_ingredients'])
            cooking_methods_sql.add_recipe_cooking_methods(cursor, recipe_id, recipe['recipe_cooking_methods'])
            if recipe['recipe_additional_tools'] is not None:
                additional_tools_sql.add_recipe_additional_tools(cursor, recipe_id, recipe['recipe_additional_tools'])
            if recipe['recipe_tags'] is not None:
                recipe_tags_sql.add_recipe_tags(cursor, recipe_id, recipe['recipe_tags'])
        except(Exception) as error:
            connection.rollback()
            print(f"Error, recipe not created: {error}")
        else:
            connection.commit()
        finally:
            print('Task is finished, either success or failure')