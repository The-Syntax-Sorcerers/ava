import datetime
import json
import os

import flask_login
import flask_wtf.csrf
import pytz
from flask import Blueprint, render_template, send_from_directory, redirect, url_for
from server.extensions import get_and_clear_cookies
from server.models.models import User, Subject, Assignment

common = Blueprint('common', __name__, template_folder=os.getcwd()+"/client/dist", static_folder=os.getcwd()+"/client/dist")


@common.route('/',  methods=["GET"])
def index():
    print("Serving Landing", common.static_folder+'/index.html')

    cookies = get_and_clear_cookies()
    return render_template('routeIndex/index.html', template_data=cookies, csrf=flask_wtf.csrf.generate_csrf())


@common.route('/dashboard',  methods=["GET"])
@flask_login.login_required
def dashboard():
    print("Serving Dash")

    template_data = {
        "subjects": [],
        "random": 69,
    }

    # Getting the data from supabase & converting to JSON format as required.
    user: User = flask_login.current_user
    for sub in user.get_subjects():
        temp = {'id': sub.subject_id, 'name': sub.name, 'link': 'subjects/' + sub.subject_id}
        template_data['subjects'].append(temp)

    return render_template('routeDashboard/index.html', template_data=template_data)


@common.route('/assignments',  methods=["GET"])
@flask_login.login_required
def assignments():
    print("Serving Assignments")

    template_data = {
        "upcoming": [],
        "past": [],
        "user_type": "student",
        "random": 69,
    }

    # Getting the data from supabase & converting to JSON format as required.
    user: User = flask_login.current_user
    db_asses: [Assignment] = user.get_assignments()
    db_asses = sorted(db_asses, key=lambda x: (x.due_date is not None, x.due_date))
    for ass in db_asses:
        temp = {
            "id": ass.subject_id,
            "name": ass.name,
            "due_date": ass.due_datetime,
            "link": f'subjects/{ass.subject_id}/{ass.id}'
        }
        print(ass.due_datetime, datetime.datetime)
        if ass.due_datetime and ass.due_datetime > datetime.datetime.now(ass.due_datetime.tzinfo):
            template_data['upcoming'].append(temp)
        else:
            template_data['past'].append(temp)

    return render_template('routeAssignments/index.html', template_data=template_data)


@common.route('/profile', methods=["GET"])
@flask_login.login_required
def profile():
    print("Serving Profile")

    scores = [76, 82, 62, 56, 42, 91, 77, 7, 62]
    template_data = {
        "comparison": [{"due_date": "12/12/2023", "id": "COMP123456", "name": "Automata Worksheet",
                        "link": "/assignnent"},
                       {"due_date": "10/17/2023", "id": "COMP123456",
                        "name": "NFA assignment 2", "link": "/ass"},
                       {"due_date": "10/01/2023", "id": "MAST30026",
                        "name": "Bayesian inference 4", "link": "/ass"}],
        "past": [{"due_date": "08/30/2023", "id": "COMP123456",
                  "name": "Grok Worksheet 1", "link": "/ass"},
                 {"due_date": "02/26/2023", "id": "COMP123456",
                  "name": "Grok Worksheet 2", "link": "/ass"}],
        "id": 1171234,
        "allscores": scores,
        "score": round(sum(scores) / len(scores)),
    }

    return render_template('routeProfile/index.html', template_data=template_data)
