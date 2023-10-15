import io
import json
import os
import datetime
import sys

import flask
import flask_login
import flask_wtf.csrf

from flask import Blueprint, send_from_directory, request, redirect, url_for, render_template, session, make_response, send_file
from server.extensions import get_and_clear_cookies, supabase_sec, supabase_anon, set_cookies
from server.models import User, Subject, Assignment, Storage
from werkzeug.datastructures.file_storage import FileStorage


ALLOWED_FILE_TYPES = ['text/plain', 'application/pdf']
subjects = Blueprint('subjects', __name__, url_prefix='/subjects',
                     template_folder=os.getcwd() + "/client/dist", static_folder=os.getcwd() + "/client/dist")


# Routes to the subject_page for a subject using a given subject_id
@subjects.route('/<sub_id>', methods=['GET'])
@flask_login.login_required
def subject_page(sub_id):
    print("Serving Subject page")
    user: User = flask_login.current_user
    user_type = user.get_user_type()

    sub = Subject.get_subject(sub_id)
    asses = sub.get_assignments()
    asses = sorted(asses, key=lambda x: (x.due_date is not None, x.due_date))

    template_data = {
        "upcoming": [],
        "past": [],
        "subject": {"id": sub.subject_id, "description": sub.description, "prof": sub.professor_email},
        "user_type": user_type,
        "random": 69,
        "students": [{"name": "Jimmy", "link": "/profile"}]
    }

    for ass in asses:
        temp = {
            "id": ass.subject_id,
            "name": ass.name,
            "due_date": ass.due_datetime,
            "link": f'/subjects/{ass.subject_id}/{ass.id}'
        }
        print(ass.due_datetime, datetime.datetime)
        if ass.due_datetime and ass.due_datetime > datetime.datetime.now(ass.due_datetime.tzinfo):
            template_data['upcoming'].append(temp)
        else:
            template_data['past'].append(temp)

    return render_template('routeSubject/index.html', template_data=template_data, csrf=flask_wtf.csrf.generate_csrf())


@subjects.route('/<sub_id>/<ass_id>', methods=["GET"])
@flask_login.login_required
def assignment_page(sub_id, ass_id):
    print("Serving Assignment page")
    user: User = flask_login.current_user
    user_type = user.get_user_type()
    sub = Subject.get_subject(sub_id)

    current_ass = Assignment.get_assignment(sub_id, ass_id)
    cookies = get_and_clear_cookies()

    template_data = {
        "assignment": {"id": current_ass.subject_id, "name": current_ass.name, "due_date": current_ass.due_datetime,
                       "description": current_ass.description, "marks": "???/100"},
        "user_type": user_type,
        "students": [{'name': student.name, 'id': student.id,
                      'link': ''} for student in sub.get_students()],
        "showSubmitModal": cookies.get('showModal', False),
        "verificationSuccess": cookies.get('verificationSuccess', False)
    }

    return render_template('routeAssignment/index.html', template_data=template_data)


@subjects.route('/<sub_id>/<ass_id>/submit_assignment', methods=["POST"])
@flask_login.login_required
def submit_assignment(sub_id, ass_id):
    print("Serving Assignment Submission POST Route")

    user: User = flask_login.current_user
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
        Storage.delete_current_assignment(sub_id, ass_id, user.id)
        if Storage.upload_current_assignment(file_bytes, sub_id, ass_id, user.id):
            temp_cookies['verificationSuccess'] = True

    set_cookies(temp_cookies)
    return redirect(url_for('subjects.assignment_page', sub_id=sub_id, ass_id=ass_id))


@subjects.route('/<sub_id>/<ass_id>/fetch_assignment_file', methods=["GET"])
@flask_login.login_required
def fetch_assignment(sub_id, ass_id):
    print("Fetch Assignment File GET Route")
    user: User = flask_login.current_user

    is_submitted = Storage.exists_assignment_bool(str(sub_id), str(ass_id), str(user.id))

    if is_submitted:
        file_bytes = Storage.download_current_assignment(str(sub_id), str(ass_id), str(user.id))
        file_object = io.BytesIO(file_bytes)

        file_name = f'{str(sub_id)}-a{str(ass_id)}-u{str(user.id)}'
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


@subjects.route('/create_subject', methods=['POST'])
@flask_login.login_required
def create_subject():
    print("uploading subject")
    user: User = flask_login.current_user
    user_type = user.get_user_type()
    user_email = user.email

    print("created form")
    
    if not user_type == "teacher":
        print('User is not a teacher')
        return redirect(url_for('common.dashboard'))

    sub = Subject(request.form.get('id'), request.form.get('desc'), user_email, request.form.get('name'))
    print("Attempting to Create Subject", sub)
    Subject.create_subject(sub)

    return redirect(url_for('common.dashboard'))

