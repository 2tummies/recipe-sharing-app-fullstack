from django.db import connection
from django.http import JsonResponse

def get_all_recipe_tags():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM recipe_tags;")
        rows = cursor.fetchall()
    return JsonResponse(rows, safe=False)

def get_recipe_tags_for_recipe(recipeId):
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT recipe_tags.recipe_tag_id, recipe_tag_name FROM recipes " +
            "JOIN recipe_recipe_tags ON recipe_recipe_tags.recipe_id = recipes.recipe_id " +
            "JOIN recipe_tags ON recipe_tags.recipe_tag_id = recipe_recipe_tags.recipe_tag_id " +
            "WHERE recipes.recipe_id = %s;",
           [recipeId]
        )
        return cursor.fetchall()

def add_recipe_tags(cursor, recipe_id, tags):
    for tag in tags:
        try:
            cursor.execute(
                "INSERT INTO recipe_recipe_tags(recipe_id, recipe_tag_id) VALUES (%s, %s)",
                [recipe_id, tag[0]]
            )
        except Exception as error:
            print(f"Error inserting tag {tag[0]}: {error}")