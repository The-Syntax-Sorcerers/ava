import json
import os

import flask
from flask import Blueprint, send_from_directory


common = Blueprint('common', __name__, template_folder= os.getcwd()+"/client/dist", static_folder=os.getcwd()+"/client/dist")


@common.route('/')
def landing():
    print("Serving Landing", common.static_folder+'/index.html')

    template_data = {
        "my_data": "Sample String",
        "random": 69,
    }
    return flask.render_template('routeIndex/index.html', template_data=json.dumps(template_data))
    # return send_from_directory(common.static_folder, 'index.html', my_data="JAY SHRI RAM!")


@common.route('/dashboard')
def dashboard():
    print("Serving Dash")
    template_data = {
        "subjects": [{"due_date": "12/12/2023", "id": "COMP123456", "name": "Some BS Assignment"},
                     {"due_date": "10/17/2023", "id": "COMP123456", "name": "Another BS assignment"},
                     {"due_date": "10/01/2023", "id": "COMP123456", "name": "What is this Assignment?!?!?!?"},
                     {"due_date": "08/30/2023", "id": "COMP123456", "name": "Grok Worksheet 1"},
                     {"due_date": "02/26/2023", "id": "COMP123456", "name": "Grok Worksheet 2"}],
        "random": 69,
    }
    return flask.render_template('routeDashboard/index.html', template_data=template_data)


@common.route('/assignments')
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
