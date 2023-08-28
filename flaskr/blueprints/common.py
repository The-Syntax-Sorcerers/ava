import flask_login
from werkzeug.datastructures.file_storage import FileStorage
from flask import request, render_template, redirect, url_for, Blueprint
from flask_login import login_user, login_required, logout_user, fresh_login_required


from flaskr.models.flaskforms import UploadFileForm
from flaskr.models.models import Assignment, User

common = Blueprint("common", __name__)
ALLOWED_FILE_TYPES = ['text/plain']


# a simple page that says hello
@common.route('/dashboard', methods=["GET"])
@login_required
def dashboard(name='dashboard'):
    print("CURR", flask_login.current_user)
    return render_template('dashboard.html', name=name)

# Routes to the all_assignments page
@common.route('/assignments',  methods=['GET'])
@login_required
def all_assignments(name='all_assignments'):

    # Get all the subjects listed for the current user
    user: User = flask_login.current_user
    return render_template('subs/all_assignments.html', current_assignments=user.get_assignments())
