from flask import request, render_template, redirect, url_for, Blueprint
from flask_login import login_user, login_required, logout_user
from flask_login import login_required


common = Blueprint("common", __name__)

# a simple page that says hello
# @common.route('/')
# def login(name='login'):
#     return render_template('auth/login.html')


# a simple page that says hello
@common.route('/dashboard', methods=["GET", "POST"])
@login_required
def dashboard(name='dashboard'):
    return render_template('dashboard.html', name=name)


# a simple page that says hello
@common.route('/upload',  methods=['GET', 'POST'])
def upload(name='assignment upload'):
    if request.method == 'POST':
        return redirect(url_for('homepage'))
    return render_template('assignment_upload.html', name=name)
