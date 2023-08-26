import io

import flask_login
from flask import Blueprint, render_template
from flask_login import login_required
from werkzeug.datastructures.file_storage import FileStorage
from werkzeug.utils import secure_filename

from flaskr.models.flaskforms import UploadFileForm
from flaskr.models.models import Subject, Storage

ALLOWED_FILE_TYPES = ['text/plain']
subjects = Blueprint("subjects", __name__, url_prefix="/subjects")


@subjects.route('/', defaults={'sub_id': None})
@subjects.route('/<sub_id>', methods=['GET'])
@login_required
def index(sub_id=0, name='subjects_page'):
    user = flask_login.current_user
    if not sub_id:

        return render_template('subs/subjects.html', enrolled_subjects=user.get_subjects(), available_subjects=Subject.get_all_subjects())

    sub = Subject.get_subject(sub_id)
    ass = sub.get_assignments()
    return render_template('subs/subject_page.html', subject=sub, assignments=ass)


@subjects.route('/<sub_id>/<ass_id>', methods=['GET', 'POST'])
@login_required
def assignment_page(sub_id, ass_id):
    s, user = Storage(), flask_login.current_user
    form = UploadFileForm()
    form_errors = []

    if form.validate_on_submit():

        # file : from werkzeug.datastructures.file_storage import FileStorage

        if form.delete.data:    # If Delete Button is pressed.
            s.delete_assignment(str(sub_id), str(ass_id), str(user.id))
        else:   # Submit Button was pressed
            if form.file.data.content_type not in ALLOWED_FILE_TYPES:
                form_errors.append('Invalid File Type!')  # Triggered when a form is submitted & there is an error
            else:
                file = form.file.data
                # file_stream = file.stream  (Works in Python 3.11 !3.7) # Get the file stream

                # file_stream = io.BytesIO(file.read())
                # buffered_reader = io.BufferedReader(file_stream)
                s.upload_assignment(file.read(), sub_id, ass_id, user.id)

        # is_sub = s.exists_assignment_bool(str(sub_id), str(ass_id), str(user.id))
        # return render_template('subs/assignment_upload.html', form =form, ass_submitted=is_sub)

    is_sub = s.exists_assignment_bool(str(sub_id), str(ass_id), str(user.id))
    return render_template('subs/assignment_upload.html', form=form, ass_submitted=is_sub, errors=form_errors)




