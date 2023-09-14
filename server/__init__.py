import os
import socket

import flask_login
from flask import Flask, send_from_directory

from server.extensions import login_manager, supabase_sec
from server.models import User, Subject, Assignment, Storage
from server.blueprints.common import common
from server.blueprints.auth import auth

socket.setdefaulttimeout(15)
test_config = None

app = Flask(__name__, static_url_path='', static_folder=os.getcwd()+"/client/dist")
app.config.from_mapping(
    SECRET_KEY='chutiya',
)


@login_manager.user_loader
def load_user(user_id):
    print("Browser loading id:", user_id)
    return User.get_user(user_id)  # Static method call to our User model


login_manager.init_app(app)
login_manager.login_view = "common.index"


app.register_blueprint(common)
app.register_blueprint(auth)

######################## Test Config ################################



# u = User(9, 'test@gmail.com', 'test')

# sub = Subject.get_subject('COMP123456')
# print("Sub", sub)
# print("Ass", sub.get_assignments())

# s = Storage()
# s.upload_assignment('test.txt', 'COMP123456', '420', 'bluffmaster')
# print("Upload Complete!")
# print(s.exists_assignment_bool('COMP123456', '1', '9'))


# res = s.delete_assignment('COMP123456', '420', 'bluffmaster')
# print(res)
