import socket

import flask
from flask import Flask

from flaskr.extensions import login_manager, supabase_sec
from flaskr.models.User import User
from flaskr.models.Subject import Subject
from flaskr.blueprints.common import common
from flaskr.blueprints.auth import auth

socket.setdefaulttimeout(15)
test_config = None

app = Flask(__name__)
app.config.from_mapping(
    SECRET_KEY='chutiya',
)



@login_manager.user_loader
def load_user(user_id):
    print("Browser loading id:", user_id)
    return User.get_user(user_id)  # Static method call to our User model


login_manager.init_app(app)
# login_manager.login_view = "auth.login"

app.register_blueprint(common)
app.register_blueprint(auth)

######################## Test Config ################################

# sub = Subject.get_subject('COMP123456')
# print(sub.get_students())
