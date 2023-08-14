from flask import Blueprint, render_template, request, redirect, url_for

auth = Blueprint('auth', __name__)


@auth.route('/', methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        user = request.form['email']
        password = request.form['password']
        return redirect(url_for('bp.homepage', name=user))
    else:
        return render_template('auth/login.html', name='login')

@auth.route('/signup')
def signup():
    return render_template('auth/signup.html', name='login')

@auth.route('/logout')
def logout():
    return 'Logout'