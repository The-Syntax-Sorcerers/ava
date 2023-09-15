import json
import os

import flask
import flask_login
import flask_wtf.csrf
from flask import Blueprint, send_from_directory, redirect, url_for

common = Blueprint('common', __name__, template_folder= os.getcwd()+"/client/dist", static_folder=os.getcwd()+"/client/dist")


@common.route('/')
def index(loginform=None, signupform=None):
    print("Serving Landing", common.static_folder+'/index.html')

    template_data = {
        "loginform": loginform,
        "signupform": signupform,
    }
    return flask.render_template('routeIndex/index.html', template_data=json.dumps(template_data), csrf=flask_wtf.csrf.generate_csrf())


@common.route('/dashboard')
@flask_login.login_required
def dashboard():
    print("Serving Dash")

    template_data = {
        "subjects": [{"id": "BSBS873295", "name": "Intro to BS"},
                     {"id": "CHEM992376", "name": "Scuffed Chemisty"},
                     {"id": "COMP431242", "name": "Bad Physics"},
                     {"id": "CODD123456", "name": "Call of Duty"},
                     {"id": "CREED42069", "name": "Assiassians Creed"}],
        "random": 69,
    }
    return flask.render_template('routeDashboard/index.html', template_data=template_data)


@common.route('/assignments')
@flask_login.login_required
def assignments():
    print("Serving Assignments")
    template_data = {
        "all_assignments": [{"due_date": "12/12/2023", "id": "COMP123456", "name": "Some BS Assignment"},
                         {"due_date": "10/17/2023", "id": "COMP123456",
                          "name": "Another BS assignment"},
                         {"due_date": "10/01/2023", "id": "COMP123456",
                          "name": "What is this Assignment?!?!?!?"},
                         {"due_date": "08/30/2023", "id": "COMP123456",
                          "name": "Grok Worksheet 1"},
                         {"due_date": "02/26/2023", "id": "COMP123456", "name": "Grok Worksheet 2"}],
        "random": 69,
    }
    return flask.render_template('routeAssignments/index.html', template_data=template_data)

# this is a placeholder for the privacy policy and the profile page
@common.route('/privacy_policy')
@common.route('/profile')
def privacy_policy():
    print("place holder for testing")
    template_data = {
        "all_assignments": [{"due_date": "12/12/2023", "id": "COMP123456", "name": "Some BS Assignment"},
                            {"due_date": "10/17/2023", "id": "COMP123456",
                             "name": "Another BS assignment"},
                            {"due_date": "10/01/2023", "id": "COMP123456",
                             "name": "What is this Assignment?!?!?!?"},
                            {"due_date": "08/30/2023", "id": "COMP123456",
                             "name": "Grok Worksheet 1"},
                            {"due_date": "02/26/2023", "id": "COMP123456", "name": "Grok Worksheet 2"}],
        "random": 69,
    }
    return flask.render_template('routeAssignments/index.html', template_data=template_data)
