import os
import socket

from flask import Flask

from flaskr.extensions import login_manager, supabase_sec
from flaskr.models import User
from flaskr.bp import bp
from flaskr.auth import auth

socket.setdefaulttimeout(15)
test_config = None



# create and configure the app
app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
    SECRET_KEY='chutiya'
)

login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    print(login_manager.user_callback)
    print("USERID", user_id)
    res = supabase_sec.table('Users').select('*').eq('id', user_id).execute().data
    if len(res) == 0:
        return None

    res = res[0]
    return User(res['id'], res['email'], res['name'], res['faculty'], res['uuid'])



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
