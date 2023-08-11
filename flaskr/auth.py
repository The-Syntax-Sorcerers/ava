from flask import Blueprint, render_template

auth = Blueprint('auth', __name__)


@auth.route('/')
def homepage():
    return 'Homepage: Hello, World!'

@auth.route('/login')
def login():
    return render_template('login.html', name='login')

@auth.route('/signup')
def signup():
    return 'Signup'

@auth.route('/logout')
def logout():
    return 'Logout'