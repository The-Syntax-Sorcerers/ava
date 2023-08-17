# Libraries
import flask_login
from flask import Blueprint, render_template, redirect, url_for, flash

# Our Entities
from flaskr.postgres.models import User
from flaskr.postgres.extensions import supabase_anon, supabase_sec
from flaskr.routes.flaskforms import LoginForm, SignupForm

# Error Objects
from gotrue.errors import AuthApiError


auth = Blueprint('auth', __name__)


@auth.route('/', methods=["GET", "POST"])
def login():
    if flask_login.current_user.is_authenticated:
        return redirect(url_for('bp.dashboard'))

    form = LoginForm()

    if form.validate_on_submit():
        try:
            user = supabase_anon.auth.sign_in_with_password({"email": form.email.data, "password": form.password.data})
            supabase_anon.postgrest.auth(user.session.access_token)

            flask_login.login_user(User(supabase_anon, user.user))
            flash('Logged in successfully!', 'success')
            print("Logged In!")
            return redirect(url_for('bp.dashboard'))
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
        # Can read id, name, email, faculty, password
        email = form.email.data
        password = form.password.data

        dto = {
            "email": form.email.data,
            "name": form.name.data,
            "faculty": form.faculty.data
        }

        try:
            print("Attemption signup", email, password)
            user = supabase_anon.auth.sign_up({"email": email, "password": password})
            supabase_sec.table('Users').insert(dto).execute()

            print("Signed up:", email)

            flash('Account created successfully!', 'success')
            return redirect(url_for('auth.login'))

        except AuthApiError as e:
            print(e.status, e.message)
            if e.status == 422:
                print("Invalid Format:", e.message)
            else:
                print("UNHANDLED ERROR:", e.message)

    return render_template('auth/signup.html', form=form)


@auth.route('/complete')
def confirmation():
    return render_template('auth/email_confirmation.html')


@auth.route('/logout')
@flask_login.login_required
def logout():
    flask_login.logout_user()
    flash('Logged out successfully!', 'success')
    return redirect(url_for('auth.login'))

