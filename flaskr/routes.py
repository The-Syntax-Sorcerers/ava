from flask import request, render_template, redirect, url_for, Blueprint
from flask_login import login_user, login_required, logout_user
from werkzeug.security import generate_password_hash, check_password_hash

from .extensions import db
from .models import Country, City, User

bp = Blueprint("bp", __name__)

# a simple page that says hello
@bp.route('/')
def login(name='login'):
    return render_template('auth/login.html', name=name)

@bp.route('/signup')
def signup(name='homepage'):
    return render_template('signup.html', name=name)

# a simple page that says hello
@bp.route('/home', methods=["GET", "POST"])
def homepage(name='homepage'):
    return render_template('home.html', name=name)

# a simple page that says hello
@bp.route('/upload',  methods=['GET', 'POST'])
def upload(name='assignment upload'):
    if request.method == 'POST':
        return redirect(url_for('homepage'))
    return render_template('assignment_upload.html', name=name)