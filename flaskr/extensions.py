import os
from flask_login import LoginManager
from supabase import create_client, Client

url: str = os.environ.get("SUPABASE_URL")
public_key: str = os.environ.get("SUPABASE_PUBLIC_KEY")
secret_key: str = os.environ.get("SUPABASE_SECRET_KEY")

supabase_anon: Client = create_client(url, public_key)
supabase_sec: Client = create_client(url, secret_key)
login_manager = LoginManager()
