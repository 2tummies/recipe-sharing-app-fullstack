from django.db import connection
from django.http import JsonResponse

def get_ingredients_list():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM ingredients;")
        rows = cursor.fetchall()
    return JsonResponse(rows, safe=False)