from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask import get_flashed_messages  # DO NOT REMOVE
from flask_login import login_required, logout_user, current_user, login_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError

from .models import User
from .extensions import db

auth = Blueprint('auth', __name__)


class SignupForm(FlaskForm):
    id = StringField('ID', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    name = StringField('First Name', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    faculty = SelectField('Faculty', choices=[
        ('science', 'Faculty of Science'),
        ('arts', 'Faculty of Arts'),
        ('medicine', 'Faculty of Medicine')
    ], validators=[DataRequired()])
    submit = SubmitField('Sign Up')

    def validate_email(self, email):
        existing_user = User.query.filter_by(email=email.data).first()
        if existing_user:
            raise ValidationError('This email is already in use.')

    def validate_id(self, id):
        existing_user = User.query.filter_by(id=id.data).first()
        if existing_user:
            raise ValidationError('This ID is already in use.')


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')


@auth.route('/', methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('bp.dashboard'))

    form = LoginForm()

    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()

        if user is None or not user.check_password(form.password.data):
            flash('Invalid email or password', 'danger')
        else:
            login_user(user)
            flash('Logged in successfully!', 'success')
            return redirect(url_for('bp.dashboard'))

    return render_template('auth/login.html', loginform=form)

    # return render_template('auth/login.html', form=form)

    # if request.method == 'POST':
    #     user = request.form['email']
    #     password = request.form['password']
    #     return redirect(url_for('bp.dashboard'))


@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignupForm()

    if form.validate_on_submit():
        user = User(
            id=form.id.data,
            email=form.email.data,
            name=form.name.data,
            faculty=form.faculty.data
        )

        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()

        print("User Created:", user)
        flash('Account created successfully!', 'success')
        return redirect(url_for('auth.login'))

    return render_template('auth/signup.html', form=form)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out successfully!', 'success')
    return redirect(url_for('auth.login'))

