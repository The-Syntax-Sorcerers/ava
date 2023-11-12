import io
import json
import os

import flask_login
import requests
from flask import Blueprint, redirect, url_for, request, make_response

from werkzeug.datastructures.file_storage import FileStorage

from server.extensions import set_cookies, supabase_sec
from server.models import User, Assignment, Storage, PastStorage

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

        # invoke_lambda_function(sub_id, ass_id, user_id)
        PastStorage.upload_assignment(file_bytes, user_id, ass_id)

    set_cookies(temp_cookies)
    return redirect(url_for('subjects.assignment_page', sub_id=sub_id, ass_id=ass_id))


def invoke_lambda_function(subject_id, assignment_id, user_id):
    user_email = supabase_sec.table('User').select('email').eq('id', user_id).execute().data[0]['email']

    base = 'https://venmji33ak3elhyzxs4l7qkahu0nltef.lambda-url.ap-southeast-2.on.aws'
    params = f'/predict?user_email={user_email}&subject_id={subject_id}&assignment_id={assignment_id}&user_id={user_id}'
    lambda_url = base + params

    headers = {
        'Content-Type': 'application/json'
    }

    # Convert payload to JSON format
    # payload_json = json.dumps(payload)

    # Make a POST request to the Lambda function URL
    response = requests.get(lambda_url, headers=headers)

    # Return the response from the Lambda function
    print("lambda Response", response.text)
    return response.text


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
