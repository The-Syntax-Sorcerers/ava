import os
from flask import Flask

from .extensions import db, login_manager
from .models import User
from .routes import bp


test_config = None

# create and configure the app
app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
    SECRET_KEY='chutiya',
    SQLALCHEMY_DATABASE_URI='sqlite:///db.sqlite3',
    SQLALCHEMY_TRACK_MODIFICATIONS=False
)

# db.init_app(app)
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

if test_config is None:
    # load the instance config, if it exists, when not testing
    app.config.from_pyfile('config.py', silent=True)
else:
    # load the test config if passed in
    app.config.from_mapping(test_config)

# ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass
# blueprint for auth routes in our app
from .auth import auth as auth_blueprint
app.register_blueprint(auth_blueprint)

# blueprint for non-auth parts of app
from .main import app as main_blueprint
app.register_blueprint(main_blueprint)


app.register_blueprint(bp)

