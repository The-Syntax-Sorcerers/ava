import json
import os
import datetime
from time import strptime, strftime

import flask
import flask_login
import flask_wtf.csrf
from server.extensions import set_cookies
from flask import Blueprint, send_from_directory, session, redirect, url_for, render_template, request
from server.extensions import get_and_clear_cookies, supabase_anon, supabase_sec
from server.models import User, Subject, Assignment
from server.models.flaskforms import CreateAssignmentForm


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
        "students": [{'name': student.name, 'id': student.id,
                      'link': ''} for student in sub.get_students()]
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
    template_data = {
        "assignment": {"id": current_ass.subject_id, "name": current_ass.name, "due_date": current_ass.due_datetime,
                       "description": current_ass.description, "marks": "???/100"},
        "user_type": user_type,
        "students": [{'name': student.name, 'id': student.id,
                      'link': ''} for student in sub.get_students()]
    }

    return render_template('routeAssignment/index.html', template_data=template_data)


@subjects.route('/<sub_id>/create_assignment', methods=["POST"])
@flask_login.login_required
def upload_assignment(sub_id):
    print("uploading assignment")
    user: User = flask_login.current_user
    user_type = user.get_user_type()

    if not user_type == "teacher":
        print('User is not a teacher')
        #     return redirect("/dashboard")

    flask_wtf.csrf.validate_csrf(request.form.get('csrf_token'))

    data = {
        'subject_id': sub_id,
        'name': request.form.get('name'),
        'due_datetime': strftime('%Y-%m-%d %H:%M:%S', strptime(request.form.get('duedate'), '%d/%m/%Y')),
        'description': request.form.get('desc'),
    }
    print("Attempting to Create Assignment", data)
    Assignment.create_assignment(data)

    return redirect(f"/subjects/{sub_id}")


@subjects.route('/<sub_id>/add_student', methods=["GET"])
@flask_login.login_required
def add_student_subject(sub_id):

    return redirect(f"/subjects/{sub_id}")


