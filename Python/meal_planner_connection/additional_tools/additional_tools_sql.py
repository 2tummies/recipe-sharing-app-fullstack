from django.db import connection
from django.http import JsonResponse

def get_all_additional_tools():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM additional_tools;")
        rows = cursor.fetchall()
    return JsonResponse(rows, safe=False)