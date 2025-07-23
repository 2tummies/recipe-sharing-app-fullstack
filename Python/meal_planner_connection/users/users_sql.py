from django.db import connection
        
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