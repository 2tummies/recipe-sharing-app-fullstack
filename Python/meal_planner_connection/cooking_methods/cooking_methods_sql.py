from django.db import connection
from django.http import JsonResponse

def get_all_cooking_methods():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM cooking_methods;")
        rows = cursor.fetchall()
    return JsonResponse(rows, safe=False)