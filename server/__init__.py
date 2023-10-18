import os
import socket

from flask import Flask

from server.extensions import login_manager, supabase_sec
from server.models import User, Subject, Assignment, Storage
from server.blueprints.common import common
from server.blueprints.auth import auth
from server.blueprints.subjects import subjects
from server.blueprints.submission import submission
from server.blueprints.cron import cronjob

socket.setdefaulttimeout(15)
test_config = None

app = Flask(__name__, static_url_path='',
            static_folder=os.getcwd() + "/client/dist")
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
app.register_blueprint(subjects)
app.register_blueprint(submission)
app.register_blueprint(cronjob)
