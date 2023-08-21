import socket

from flask import Flask

from flaskr.extensions import login_manager, supabase_sec
from flaskr.models.models import User
from flaskr.blueprints.common import common
from flaskr.blueprints.auth import auth

socket.setdefaulttimeout(15)
test_config = None


app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
    SECRET_KEY='chutiya',
    UPLOAD_FOLDER='static/files'
)


@login_manager.user_loader
def load_user(user_id):
    print(login_manager.user_callback)
    print("USERID", user_id)
    res = supabase_sec.table('Users').select('*').eq('id', user_id).execute().data
    if len(res) == 0:
        return None

    res = res[0]
    return User(res['id'], res['email'], res['name'], res['uuid'])


login_manager.init_app(app)
app.register_blueprint(common)
app.register_blueprint(auth)

