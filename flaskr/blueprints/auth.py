# Libraries
import flask_login
from flask import Blueprint, render_template, redirect, url_for, flash

# Our Entities
from flaskr.models.models import User
from flaskr.extensions import supabase_anon, supabase_sec
from flaskr.models.flaskforms import LoginForm, SignupForm

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
            # Authenticating user
            user = supabase_anon.auth.sign_in_with_password({"email": form.email.data, "password": form.password.data})
            supabase_anon.postgrest.auth(user.session.access_token)

            # Loading User from db for flask_login
            res = supabase_anon.table('Users').select('*').eq('email', form.email.data).execute().data[0]
            flask_login.login_user(User(res['id'], res['email'], res['name'], res['uuid']))

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

        try:
            print("Attempted signup", email, password)
            user = supabase_anon.auth.sign_up({"email": email, "password": password})
            print("User:", user)
            dto = {
                "email": form.email.data,
                "name": form.name.data,
                "uuid": user.user.id
            }

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
