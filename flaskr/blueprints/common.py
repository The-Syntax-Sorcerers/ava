import flask_login
from werkzeug.datastructures.file_storage import FileStorage
from flask import request, render_template, redirect, url_for, Blueprint
from flask_login import login_user, login_required, logout_user, fresh_login_required

from flaskr.models.flaskforms import UploadFileForm

common = Blueprint("common", __name__)
ALLOWED_FILE_TYPES = ['text/plain']


# a simple page that says hello
@common.route('/dashboard', methods=["GET"])
@login_required
def dashboard(name='dashboard'):
    print("CURR", flask_login.current_user)
    return render_template('dashboard.html', name=name)


# upload an assignment
@common.route('/upload',  methods=['GET', 'POST'])
@login_required
def upload(name='assignment upload'):
    form = UploadFileForm()
    form_errors = []

    if form.validate_on_submit():
        if form.file.data.content_type not in ALLOWED_FILE_TYPES:
            form_errors.append('Invalid File Type!')    # Triggered when a form is submitted & there is an error
        else:
            file: FileStorage = form.file.data
            user = flask_login.current_user
            res = []
            return render_template('assignment_upload.html', name=name, submitted=True, upload_content=res)

    return render_template('assignment_upload.html', name=name, form=form, submitted=False, errors=form_errors)


