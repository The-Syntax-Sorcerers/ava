import json
import os

import flask
import flask_login
import flask_wtf.csrf
from flask import Blueprint, send_from_directory, redirect, url_for
from server.extensions import get_and_clear_cookies

common = Blueprint('common', __name__, template_folder=os.getcwd()+"/client/dist", static_folder=os.getcwd()+"/client/dist")


@common.route('/')
def index(loginform=None, signupform=None):
    print("Serving Landing", common.static_folder+'/index.html')

    cookies = get_and_clear_cookies()
    return flask.render_template('routeIndex/index.html', template_data=cookies, csrf=flask_wtf.csrf.generate_csrf())


@common.route('/privacy_policy')
def privacy_policy(loginform=None, signupform=None):
    template_data = {
        "loginform": loginform,
        "signupform": signupform,
    }
    if flask_login.current_user.is_authenticated:
        print("Serving Authenticated Privacy Policy")
        return flask.render_template('routePrivacyPolicy/index.html', auth_user=True, template_data=json.dumps(template_data), csrf=flask_wtf.csrf.generate_csrf())
    else:
        print("Serving Anonymous Privacy Policy")
        return flask.render_template('routePrivacyPolicy/index.html', auth_user=False, template_data=json.dumps(template_data), csrf=flask_wtf.csrf.generate_csrf())


@common.route('/dashboard')
@flask_login.login_required
def dashboard():
    print("Serving Dash")

    template_data = {
        "subjects": [{"id": "BSBS873295", "name": "Intro to BS", "link": "/subject"},
                     {"id": "CHEM992376", "name": "Scuffed Chemisty",
                         "link": "/assignments"},
                     {"id": "COMP431242", "name": "Bad Physics",
                         "link": "/assignments"},
                     {"id": "CODD123456", "name": "Call of Duty",
                         "link": "/assignments"},
                     {"id": "CREED42069", "name": "Assiassians Creed", "link": "/assignments"}],
        "random": 69,
    }
    return flask.render_template('routeDashboard/index.html', template_data=template_data)


@common.route('/assignments')
@flask_login.login_required
def assignments():
    print("Serving Assignments")
    template_data = {
        "upcoming": [{"due_date": "12/12/2023", "id": "COMP123456", "name": "Some BS Assignment",
                      "link": "/assignment"},
                     {"due_date": "10/17/2023", "id": "COMP123456",
                         "name": "Another BS assignment", "link": "/ass"},
                     {"due_date": "10/01/2023", "id": "COMP123456",
                         "name": "What is this Assignment?!?", "link": "/ass"}],
        "past": [{"due_date": "08/30/2023", "id": "COMP123456",
                  "name": "Grok Worksheet 1", "link": "/ass"},
                 {"due_date": "02/26/2023", "id": "COMP123456",
                  "name": "Grok Worksheet 2", "link": "/ass"}],
        "user_type": "student",
    }
    return flask.render_template('routeAssignments/index.html', template_data=template_data)


@common.route('/subject')
@flask_login.login_required
def subject():
    print("Serving Subject page")

    template_data = {
        "upcoming": [{"due_date": "12/31/2023", "id": "BSBS873295",
                      "name": "Don't Use ChatGPT", "link": "/assignment"},
                     {"due_date": "10/17/2023", "id": "BSBS873295",
                      "name": "Dumb Project", "link": "/ass"},
                     {"due_date": "02/01/2028", "id": "BSBS873295",
                      "name": "Try Not to Procrastinate",  "link": "/ass"}],
        "past": [{"due_date": "08/30/2023", "id": "BSBS873295",
                 "name": "Useless Grok Worksheet", "link": "/ass"},
                 {"due_date": "02/26/2023", "id": "BSBS873295",
                  "name": "Stupid Assignment 2", "link": "/ass"}],
        "subject": {"id": "BSBS873295", "name": "Intro to BS",
                    "description": "Bullshit is everywhere, and we've had enough. We want to teach people to detect and defuse bullshit where ever it may arise.",
                    "prof": "Carl T. Bergstrom"}
    }
    return flask.render_template('routeSubject/index.html', template_data=template_data)


@common.route('/assignment')
@flask_login.login_required
def assignment():
    print("Serving Assignment page")

    template_data = {
        "assignment": {"due_date": "12/31/2023", "id": "BSBS873295",
                       "name": "Don't Use ChatGPT",
                       "link": "/assignment",
                       "description": "Write stuff in your own words. Do not use ChatGPT or any AI to assist you. WE CAN TELL!!",
                       "marks": "???/100"},
        "user_type": "student"
    }
    return flask.render_template('routeAssignment/index.html', template_data=template_data)
