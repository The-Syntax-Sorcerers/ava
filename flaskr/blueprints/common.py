import flask_login
from werkzeug.datastructures.file_storage import FileStorage
from flask import request, render_template, redirect, url_for, Blueprint
from flask_login import login_user, login_required, logout_user, fresh_login_required


from flaskr.models.flaskforms import UploadFileForm
from flaskr.models.models import Assignment, User

common = Blueprint("common", __name__)
ALLOWED_FILE_TYPES = ['text/plain']


# a simple page that says hello
@common.route('/dashboard', methods=["GET"])
@login_required
def dashboard(name='dashboard'):
    print("CURR", flask_login.current_user)
    return render_template('dashboard.html', name=name)


# Routes to the all_assignments page
@common.route('/assignments',  methods=['GET'])
@login_required
def all_assignments(name='all_assignments'):

    # Get all the subjects listed for the current user
    user: User = flask_login.current_user
    return render_template('subs/all_assignments.html', current_assignments=user.get_assignments())


@common.route('/profile', methods=['GET', 'POST'])
def profile(name='profile'):
    return render_template('profile.html', name=name)


@common.route('/privacy_policy', methods=['GET', 'POST'])
def privacy_policy(name='privacy_policy'):
    return render_template('privacy_policy.html', name=name)

# this is here to test the react app


@common.route('/ass', methods=['GET'])
# @login_required
def assignments():
    # user: User = flask_login.current_user
    # current_assignments = user.get_assignments()
    # response_data = {"all_assignments": []}
    # for ass in current_assignments:
    #     response_data['all_assignments'].append(
    #         {'id': ass.subject_id, 'name': ass.name, 'due_date': ass.due_datetime.strftime('%m/%d/%Y')})
    return {"all_assignments": [{"due_date": "12/12/2023", "id": "COMP123456", "name": "Some BS Assignment"},
                                {"due_date": "10/17/2023", "id": "COMP123456",
                                    "name": "Another BS assignment"},
                                {"due_date": "10/01/2023", "id": "COMP123456",
                                    "name": "What is this Assignment?!?!?!?"},
                                {"due_date": "08/30/2023", "id": "COMP123456",
                                    "name": "Grok Worksheet 1"},
                                {"due_date": "02/26/2023", "id": "COMP123456", "name": "Grok Worksheet 2"}]}
