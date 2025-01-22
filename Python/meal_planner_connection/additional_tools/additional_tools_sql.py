from django.db import connection
from django.http import JsonResponse

def get_all_additional_tools():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM additional_tools;")
        rows = cursor.fetchall()
    return JsonResponse(rows, safe=False)

def get_additional_tools_for_recipe(id):
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT additional_tools.additional_tool_id, additional_tool_name, additional_tool_quantity FROM recipes " +
            "JOIN recipe_additional_tools ON recipe_additional_tools.recipe_id = recipes.recipe_id " +
            "JOIN additional_tools ON additional_tools.additional_tool_id = recipe_additional_tools.additional_tool_id " +
            "WHERE recipes.recipe_id = %s;",
            [id]
        )
        return cursor.fetchall()

def add_recipe_additional_tools(cursor, recipe_id, additional_tools):
    for additional_tool in additional_tools:
        try:
            cursor.execute(
                "INSERT INTO recipe_additional_tools (recipe_id, additional_tool_id, additional_tool_quantity) VALUES (%s, %s, 1)",
                [recipe_id, additional_tool[0]]
            )
        except Exception as error:
            print(f"Error inserting tag {additional_tool[0]}: {error}")