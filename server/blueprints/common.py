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
    return flask.render_template('index.html', template_data=json.dumps(template_data))
    # return send_from_directory(common.static_folder, 'index.html', my_data="JAY SHRI RAM!")


@common.route('/dashboard')
def dashboard():
    print("Serving Dash")
    return send_from_directory(common.static_folder, 'dashboard/dashboard.html')
