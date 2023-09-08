import socket

import flask_login
from flask import Flask

from flaskr.extensions import login_manager, supabase_sec
from flaskr.models.models import User, Subject, Assignment, Storage
from flaskr.blueprints.common import common
from flaskr.blueprints.auth import auth
from flaskr.blueprints.subjects import subjects

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
login_manager.login_view = "auth.login"

app.register_blueprint(common)
app.register_blueprint(auth)
app.register_blueprint(subjects)

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

