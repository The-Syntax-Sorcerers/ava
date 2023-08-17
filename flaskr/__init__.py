import os
import socket

from flask import Flask

from flaskr.postgres.extensions import login_manager, supabase_sec
from flaskr.postgres.models import User
from flaskr.routes.bp import bp
from flaskr.routes.auth import auth

# socket.setdefaulttimeout(15)
test_config = None

# create and configure the app
app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
    SECRET_KEY='chutiya'
)

login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return supabase_sec.table("Users").select("*").eq("id", user_id).execute()


if test_config is None:
    # load the instance config, if it exists, when not testing
    app.config.from_pyfile('config.py', silent=True)
else:
    # load the test config if passed in
    print("test_config loaded")
    app.config.from_mapping(test_config)

# ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

app.register_blueprint(bp)
app.register_blueprint(auth)
