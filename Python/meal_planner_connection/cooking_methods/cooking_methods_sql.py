from django.db import connection
from django.http import JsonResponse

def get_all_cooking_methods():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM cooking_methods;")
        rows = cursor.fetchall()
    return JsonResponse(rows, safe=False)

def get_cooking_methods_for_recipe(recipeId):
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT cooking_methods.cooking_method_id, cooking_method_name, cooking_method_quantity FROM recipes " +
            "JOIN recipe_cooking_method ON recipe_cooking_method.recipe_id = recipes.recipe_id " +
            "JOIN cooking_methods ON cooking_methods.cooking_method_id = recipe_cooking_method.cooking_method_id " +
            "WHERE recipes.recipe_id = %s;",
            [recipeId]
        )
        return cursor.fetchall()