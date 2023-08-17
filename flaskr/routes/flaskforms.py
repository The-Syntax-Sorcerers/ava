from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField
from wtforms.validators import DataRequired, Email, EqualTo


class SignupForm(FlaskForm):
    id = StringField('ID', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    name = StringField('First Name', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    faculty = SelectField('Faculty', choices=[
        ('Faculty of Science', 'Faculty of Science'),
        ('Faculty of Arts', 'Faculty of Arts'),
        ('Faculty of Medicine', 'Faculty of Medicine')
    ], validators=[DataRequired()])
    submit = SubmitField('Sign Up')

    # def validate_email(self, email):
    #     existing_user = client_db.auth.
    #     print(existing_user)
    #     # existing_user = User.query.filter_by(email=email.data).first()
    #     if existing_user:
    #         raise ValidationError('This email is already in use.')
    #
    # def validate_id(self, id):
    #     return
    #     existing_user = User.query.filter_by(id=id.data).first()
    #     if existing_user:
    #         raise ValidationError('This ID is already in use.')


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')
