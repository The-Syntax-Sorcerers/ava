from flask import request, render_template, redirect, url_for, Blueprint, current_app, send_from_directory
from flask_login import login_user, login_required, logout_user
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
import os
from .extensions import db
from .models import Country, City, User

bp = Blueprint("bp", __name__)

# a simple page that says hello
@bp.route('/')
def login(name='login'):
    return render_template('auth/login.html', name=name)


@bp.route('/signup', methods=['GET', 'POST'])
def signup(name='signup'):
    if request.method == 'POST':
        firstname = request.form.get('firstname')
        lastname = request.form.get('lastname')
        email = request.form.get('email')
        faculty = request.form.get('faculty')
        password = request.form.get('password')  # Assuming you add a password field to the form
        id = request.form.get('id')

        # check if id already exists
        user = User.query.filter_by(id=id).first()
        if user:
            # Return to signup page with an error
            return render_template('auth/signup.html', error="ID already in use.")

        # Check if email already exists
        user = User.query.filter_by(email=email).first()
        if user:
            # Return to signup page with an error
            return render_template('auth/signup.html', error="Email already in use.")

        # Create a new user
        new_user = User(
            firstname=firstname,
            lastname=lastname,
            email=email,
            faculty=faculty,
            password_hash=generate_password_hash(password, method='sha256'),
            id=id
        )

        # Add new user to the database
        db.session.add(new_user)
        db.session.commit()

        return redirect(url_for('bp.homepage'))

    return render_template('auth/signup.html', name=name)


# a simple page that says hello
@bp.route('/home', methods=["GET", "POST"])
def homepage(name='homepage'):
    return render_template('home.html', name=name)


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
