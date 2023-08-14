import requests

from flask import request, render_template, redirect, url_for, Blueprint
from flask_login import login_user, login_required, logout_user
from werkzeug.security import generate_password_hash, check_password_hash

from .extensions import db
from .models import Country, City, User

bp = Blueprint("bp", __name__)


# a simple page that says hello
@bp.route('/')
def homepage(name='homepage'):
    return render_template('home.html', name=name)


# a simple page that says hello
@bp.route('/hello', methods=["GET", "POST"])
def hello():
    return 'hello'
