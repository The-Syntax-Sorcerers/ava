import io
import os

import flask_login
from flask import Blueprint, redirect, url_for, request, make_response

from werkzeug.datastructures.file_storage import FileStorage

from server.extensions import set_cookies
from server.models import User, Assignment, Storage

submission = Blueprint('submission', __name__, template_folder=os.getcwd() + "/client/dist",
                       static_folder=os.getcwd() + "/client/dist")


ALLOWED_FILE_TYPES = ['text/plain', 'application/pdf']


@submission.route('/submit_assignment/<sub_id>/<ass_id>/', defaults={'user_id': None}, methods=["POST"])
@submission.route('/submit_assignment/<sub_id>/<ass_id>/<user_id>', methods=["POST"])
@flask_login.login_required
def submit_assignment(sub_id, ass_id, user_id):
    print("Serving Assignment Submission POST Route")
    if not user_id:
        user_id = flask_login.current_user.id

    file: FileStorage = request.files['form_file']
    temp_cookies = {
        "showModal": True,
        "verificationSuccess": False,
    }

    if file.content_type not in ALLOWED_FILE_TYPES:
        temp_cookies['status'] = 403
        temp_cookies['error'] = 'Invalid File Type!'  # Triggered when a form is submitted & there is an error
    else:
        file_bytes = file.read()    # Check if it is a PDF: bs.startswith(b'%PDF-1.')
        Storage.delete_current_assignment(sub_id, ass_id, user_id)
        if Storage.upload_current_assignment(file_bytes, sub_id, ass_id, user_id):
            temp_cookies['verificationSuccess'] = True

    set_cookies(temp_cookies)
    return redirect(url_for('subjects.assignment_page', sub_id=sub_id, ass_id=ass_id))


@submission.route('/fetch_assignment/<sub_id>/<ass_id>/', defaults={'user_id': None}, methods=["GET"])
@submission.route('/fetch_assignment/<sub_id>/<ass_id>/<user_id>', methods=["GET"])
@flask_login.login_required
def fetch_assignment(sub_id, ass_id, user_id):
    print("Fetch Assignment File GET Route")
    if not user_id:
        user_id = flask_login.current_user.id

    is_submitted = Storage.exists_assignment_bool(str(sub_id), str(ass_id), str(user_id))
    if is_submitted:
        file_bytes = Storage.download_current_assignment(str(sub_id), str(ass_id), str(user_id))
        file_object = io.BytesIO(file_bytes)

        file_name = f'{str(sub_id)}-a{str(ass_id)}-u{str(user_id)}'
        if file_bytes.startswith(b'%PDF-1.'):
            file_type = 'application/pdf'
            file_name += '.pdf'
        else:
            file_type = 'text/plain'
            file_name += '.txt'

        response = make_response(file_object)
        response.headers['Content-Type'] = file_type
        response.headers['Content-Disposition'] = 'attachment; filename=' + file_name
        response.headers['filename'] = file_name
        return response

    NO_CONTENT_RESPONSE = ('', 204)
    return NO_CONTENT_RESPONSE
