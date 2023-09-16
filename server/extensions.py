import os

import flask
from flask_login import LoginManager
from supabase import create_client, Client


def load_from_env(variable_names: list):
    for v in variable_names:
        res = os.environ.get(v)
        if res:
            return res
    return None


url: str = load_from_env(["SUPABASE_URL", ])
public_key: str = load_from_env(["SUPABASE_ANON_KEY", "SUPABASE_PUBLIC_KEY"])
secret_key: str = load_from_env(["SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SECRET_KEY"])

if public_key is not None and secret_key is not None:
    supabase_anon: Client = create_client(url, public_key)
    supabase_sec: Client = create_client(url, secret_key)
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
