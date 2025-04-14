from django.db import connection
from django.http import JsonResponse
from django.utils import timezone
from django.contrib.auth.models import User

def create_user(user):
    with connection.cursor() as cursor:
        try:
            if User.objects.filter(username=user['username']).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)
            new_user = User.objects.create_user(username=user['username'], password=user['password'])
            birthday = None
            if user['birthday'] is not None:
                birthday = user['birthday']
            cursor.execute(
                "INSERT INTO users(user_id, username, date_created, birthday) " +
                "VALUES (DEFAULT, %s, %s, %s) RETURNING user_id;",
                [new_user.username, timezone.now().date(), birthday]
            )
            new_user_id = cursor.fetchone()[0]
        except Exception as e:
            connection.rollback()
            print(e)
        else:
            connection.commit()
            print('user added: ' + new_user_id)
            return new_user_id
        
def get_id_by_username(username):
    with connection.cursor() as cursor:
        try:
            cursor.execute(
                "SELECT user_id FROM users WHERE username = %s;",
                [username]
            )
            user_id = cursor.fetchone()
            if user_id is not None:
                return user_id
            else:
                print('not found')
                return None
        except Exception as e:
            connection.rollback()
            print(e)