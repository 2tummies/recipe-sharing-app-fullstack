from django.db import connection
from django.http import JsonResponse

def get_all_measurement_units():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM measurement_units;")
        rows = cursor.fetchall()
    return JsonResponse(rows, safe=False)