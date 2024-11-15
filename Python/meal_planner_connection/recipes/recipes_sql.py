from django.db import connection
from django.http import JsonResponse

def get_all_recipes():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM recipes;")
        rows = cursor.fetchall()
    return JsonResponse(rows, safe=False)

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