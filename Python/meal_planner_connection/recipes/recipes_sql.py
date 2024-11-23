from django.db import connection
from django.http import JsonResponse

from ..recipe_tags import recipe_tags_sql
from ..ingredients import ingredients_sql
from ..cooking_methods import cooking_methods_sql
from ..additional_tools import additional_tools_sql

def get_shared_recipes_list():
    with connection.cursor() as cursor:
        cursor.execute("SELECT recipe_id, recipe_name, recipe_description FROM recipes;")
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

def get_shared_recipe_by_id(id):
    recipe_basics = get_recipe_basics(id)
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
            'recipe_instructions': recipe_basics[4],
            'recipe_tags': recipe_tags_data,
            'recipe_cooking_methods': recipe_cooking_methods_data,
            'recipe_additional_tools': recipe_additional_tools_data,
            'recipe_ingredients': recipe_ingredients_data

        }
        return JsonResponse(recipe_data)
    else:
        return JsonResponse({'error': 'Recipe not found'}, status=404)

def add_new_recipe(recipe):
    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "INSERT INTO recipes (recipe_id, recipe_name, recipe_description, " +
                "recipe_cook_time, recipe_prep_time, recipe_instructions) " +
                "VALUES (DEFAULT, %s, %s, %s, %s, %s);",
                [recipe.recipeName, recipe.recipeDescription, recipe.recipeCookTime, recipe.recipePrepTime, recipe.recipeInstructions]
            )
            connection.commit()
        except(Exception) as error:
            print(error)
        finally:
            print('success')