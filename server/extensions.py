import os

import flask
from flask_login import LoginManager
from supabase import create_client, Client


# Loads the first not-None value from the .env file for the given key list
def load_from_env(variable_names: list):
    for v in variable_names:
        res = os.environ.get(v)
        if res:
            return res
    return None


# Loading in the inidiviual user's supabase environment variables
url: str = load_from_env(["SUPABASE_URL"])
public_key: str = load_from_env(["SUPABASE_ANON_KEY", "SUPABASE_PUBLIC_KEY"])
secret_key: str = load_from_env(["SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SECRET_KEY"])

# Environment keys successfully loaded
if public_key is not None and secret_key is not None:
    supabase_anon: Client = create_client(url, public_key)
    supabase_sec: Client = create_client(url, secret_key)
# Environment keys not loaded
else:
    print("WARNING: ENVIRONMENT VARIABLES NOT FOUND!")
    supabase_anon = None
    supabase_sec = None

login_manager = LoginManager()


def get_cookies():
    try:
        return flask.session['cookies']
    except KeyError:
        return {}


def set_cookies(cook):
    flask.session['cookies'] = cook


def clear_cookies():
    try:
        flask.session['cookies'] = {}
    except KeyError:
        return {}


def get_and_clear_cookies():
    cookies = get_cookies()
    clear_cookies()
    return cookies
