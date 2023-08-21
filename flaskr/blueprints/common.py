from flask import request, render_template, redirect, url_for, Blueprint
from flask_login import login_user, login_required, logout_user
from flask_login import login_required
from werkzeug.utils import secure_filename
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField


common = Blueprint("common", __name__)

# a simple page that says hello
# @common.route('/')
# def login(name='login'):
#     return render_template('auth/login.html')


# a simple page that says hello
@common.route('/dashboard', methods=["GET", "POST"])
@login_required
def dashboard(name='dashboard'):
    return render_template('dashboard.html', name=name)


# a simple page that says hello
@common.route('/upload',  methods=['GET', 'POST'])
def upload(name='assignment upload'):
    if request.method == 'POST':
        return redirect(url_for('homepage'))
    return render_template('assignment_upload.html', name=name)

# class for taking file uploads
class UploadFileForm(FlaskForm):
    file = FileField("File")
    submit = SubmitField("Upload File")

# upload an assignment
@bp.route('/upload',  methods=['GET', 'POST'])
def upload(name='assignment upload'):
    form = UploadFileForm()
    if form.validate_on_submit():
        file = form.file.data
        # save to local folder
        filepath = os.path.join(os.path.abspath(os.path.dirname(__file__)), current_app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
        file.save(filepath)
        with open(filepath, 'r') as f:
            contents = f.read()
        return render_template('assignment_upload.html', name=name, submitted=True, upload_content=contents)
    return render_template('assignment_upload.html', name=name, form=form, submitted=False)