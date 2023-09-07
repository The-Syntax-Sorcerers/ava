# Libraries
import flask
import flask_login
from flask import Blueprint, render_template, redirect, url_for, flash

# Our Entities
from flaskr.models.models import User
from flaskr.extensions import supabase_anon
from flaskr.models.flaskforms import LoginForm, SignupForm

# Error Objects
from gotrue.errors import AuthApiError


auth = Blueprint('auth', __name__)


@auth.route('/', methods=["GET", "POST"])
def login():
    if flask_login.current_user.is_authenticated:
        return redirect(url_for('common.dashboard'))

    form = LoginForm()

    if form.validate_on_submit():
        try:
            # Puts email to lowercase to prevent crashing the server
            user = supabase_anon.auth.sign_in_with_password({"email": form.email.data.lower(), "password": form.password.data})
            supabase_anon.postgrest.auth(user.session.access_token)  # Updates session for the anon client
            flask_login.login_user(User.get_user_with_email(form.email.data.lower()))

            flash('Logged in successfully!', 'success')
            print("Logged In!")

            return redirect(url_for('common.dashboard'))

        except AuthApiError as e:
            print(e.status, e.message)
            if e.status == 400:
                print(e.message)
            else:
                print("UNHANDLED ERROR:", e.message)

    return render_template('auth/login.html', loginform=form)


@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignupForm()

    if form.validate_on_submit():
        try:
            User.wrapper_signup(form.email.data, form.password.data, form.name.data)

            flash('Account created successfully!', 'success')
            return redirect(url_for('auth.login'))

        except AuthApiError as e:
            print(e.status, e.message)
            if e.status == 422:
                print("Invalid Format:", e.message)
            else:
                print("UNHANDLED ERROR:", e.message)

    return render_template('auth/sign_up.html', form=form)


@auth.route('/complete')
def confirmation():
    return render_template('auth/email_confirmation.html')


@auth.route('/logout')
@flask_login.login_required
def logout():
    supabase_anon.auth.sign_out()
    flask.session.clear()
    flask_login.logout_user()
    flash('Logged out successfully!', 'success')
    print("Logged Out!")
    return redirect(url_for('auth.login'))
