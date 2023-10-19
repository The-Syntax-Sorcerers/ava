import io
import os
import datetime
from time import strptime, strftime, sleep

import flask_login
import flask_wtf.csrf

from flask import Blueprint, request, redirect, url_for, render_template, make_response
from server.extensions import get_and_clear_cookies, supabase_sec, supabase_anon, set_cookies
from server.models import User, Subject, Assignment, Storage

subjects = Blueprint('subjects', __name__, url_prefix='/subjects',
                     template_folder=os.getcwd() + "/client/dist", static_folder=os.getcwd() + "/client/dist")


# Routes to the subject_page for a subject using a given subject_id
@subjects.route('/<sub_id>', methods=['GET'])
@flask_login.login_required
def subject_page(sub_id):
    print("Serving Subject page")
    user: User = flask_login.current_user

    sub = Subject.get_subject(sub_id)
    sleep(0.1)
    asses = sub.get_assignments()
    asses = sorted(asses, key=lambda x: (x.due_date is not None, x.due_date))

    template_data = {
        "upcoming": [],
        "past": [],
        "subject": {"id": sub.subject_id, "description": sub.description, "prof": sub.professor_email},
        "user_type": user.user_type,
        "students": [{'name': student.name, 'id': student.id, 'link': ''} for student in sub.get_students()]
    }

    for ass in asses:
        temp = {
            "id": ass.subject_id,
            "name": ass.name,
            "due_date": ass.due_datetime,
            "link": f'/subjects/{ass.subject_id}/{ass.id}'
        }
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
    sub = Subject.get_subject(sub_id)

    current_ass = Assignment.get_assignment(sub_id, ass_id)
    cookies = get_and_clear_cookies()

    template_data = {
        "assignment": {"id": current_ass.id, "subject_id": current_ass.subject_id, "name": current_ass.name,
                       "due_date": current_ass.due_datetime, "description": current_ass.description,
                       "marks": "???/100"},
        "user_type": user.user_type,
        "user_email": user.email,
        "students": [{'name': student.name, 'id': student.id, 'link': ''} for student in sub.get_students()],
        "showSubmitModal": cookies.get('showModal', False),
        "verificationSuccess": cookies.get('verificationSuccess', False)
    }

    return render_template('routeAssignment/index.html', template_data=template_data, csrf=flask_wtf.csrf.generate_csrf())


@subjects.route('/<sub_id>/create_assignment', methods=["POST"])
@flask_login.login_required
def create_assignment(sub_id):
    print("uploading assignment")
    user: User = flask_login.current_user

    if not user.user_type == "teacher":
        print('User is not a teacher')
        return redirect("/dashboard")

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


@subjects.route('/create_subject', methods=['POST'])
@flask_login.login_required
def create_subject():
    print("uploading subject")
    user: User = flask_login.current_user

    if not user.user_type == "teacher":
        print('User is not a teacher')
        return redirect(url_for('common.dashboard'))

    sub = Subject(request.form.get('id'), request.form.get(
        'desc'), user.email, request.form.get('name'))

    Subject.create_subject(sub)
    return redirect(url_for('common.dashboard'))


@subjects.route('/<sub_id>/add_student', methods=["POST"])
@flask_login.login_required
def add_student_subject(sub_id):
    print("adding student")
    user: User = flask_login.current_user

    if not user.user_type == "teacher":
        print('User is not a teacher')
        return redirect("/dashboard")

    flask_wtf.csrf.validate_csrf(request.form.get('csrf_token'))
    subject = Subject.get_subject(sub_id)
    stud = User.get_user_with_email(request.form.get('email'))

    if not subject.valid_student(stud.id):
        print('Student is not valid')
    else:
        subject.add_student(stud)

    return redirect(f"/subjects/{sub_id}")
