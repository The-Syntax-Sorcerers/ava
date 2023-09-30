from flask_wtf import FlaskForm
from werkzeug.datastructures import FileStorage
from wtforms import StringField, PasswordField, SubmitField, FileField, SelectField, DateField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError, Regexp

from server.models import User


class SignupForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    name = StringField('First Name', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password', message='Passwords must match')])
    submit = SubmitField('Sign Up')

    def validate_email(self, email):
        existing_user = User.get_user_with_email(email)
        print("RAN Validation")
        if existing_user:
            raise ValidationError('This email is already in use.')


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')


# class for taking file uploads
class UploadFileForm(FlaskForm):
    file: FileStorage = FileField("File")
    submit = SubmitField("Upload File")
    delete = SubmitField("Delete File")

class CreateAssignmentForm(FlaskForm):
    name = StringField('SubjectName', validators=[DataRequired()])
    duedate = DateField("Due Date", validators=[DataRequired()])
    desc = StringField("Description", validators=[DataRequired()])