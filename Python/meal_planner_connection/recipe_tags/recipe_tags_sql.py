from django.db import connection
from django.http import JsonResponse

def get_all_recipe_tags():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM recipe_tags;")
        rows = cursor.fetchall()
    return JsonResponse(rows, safe=False)