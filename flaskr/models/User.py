from flask_login import UserMixin

from flaskr import supabase_sec
from flaskr.extensions import supabase_anon


class User(UserMixin):

    def __init__(self, tid, email, name):
        self.id = tid   # This variable needs to be called `id` to shadow variable of parent class `UserMixin`
        self.name = name
        self.email = email

    def __repr__(self):
        return f'<User> id: {self.id}, email: {self.email}'

    @staticmethod
    def get_user(user_id):
        res = supabase_sec.table('User').select('*').eq('id', user_id).execute().data
        if res:
            res = res[0]
            return User(res['id'], res['email'], res['name'])
        return None

    @staticmethod
    def get_user_with_email(user_email):
        res = supabase_sec.table('User').select('*').eq('email', user_email).execute().data
        if res:
            res = res[0]
            return User(res['id'], res['email'], res['name'])
        return None

    @staticmethod
    def wrapper_signup(email, password, name):
        print("Attempted signup", email, password)
        user = supabase_anon.auth.sign_up({"email": email, "password": password})

        dto = {
            "email": email,
            "name": name,
            "uuid": user.user.id
        }

        supabase_sec.table('User').insert(dto).execute()
        print("Signed up:", email)
