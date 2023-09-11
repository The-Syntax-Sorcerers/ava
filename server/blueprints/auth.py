import json
import os

import flask
import flask_login
import flask_wtf.csrf
from flask import Blueprint, flash, redirect, url_for, request
from gotrue.errors import AuthApiError

from server.extensions import supabase_anon
from server.models.flaskforms import LoginForm
from server import User

auth = Blueprint('auth', __name__, template_folder=os.getcwd()+"/client/dist", static_folder=os.getcwd()+"/client/dist")


@auth.route('/login', methods=["POST"])
def login():
    print("Serving Login Route!")
    if flask_login.current_user.is_authenticated:
        return redirect(url_for('common.dashboard'))

    # Validating CSRF token prevents Cross-site forgery attacks!!
    flask_wtf.csrf.validate_csrf(request.form.get('csrf_token'))

    email = request.form.get('email')
    password = request.form.get('password')

    try:
        user = supabase_anon.auth.sign_in_with_password({"email": email, "password": password})
        supabase_anon.postgrest.auth(user.session.access_token)  # Updates session for the anon client
        flask_login.login_user(User.get_user_with_email(email))

        flash('Logged in successfully!', 'success')
        print("Logged In!")

        return redirect(url_for('common.dashboard'))

    except AuthApiError as e:
        print(e.status, e.message)
        if e.status == 400:
            print(e.message)
        else:
            print("UNHANDLED ERROR:", e.message)

    return redirect(url_for('common.dashboard'))


@auth.route('/signup', methods=['POST'])
def signup():
    print("Serving Signup Route!")
    print(flask_login.current_user)
    if flask_login.current_user.is_authenticated:
        return redirect(url_for('common.dashboard'))

    # Validating CSRF token prevents Cross-site forgery attacks!!
    flask_wtf.csrf.validate_csrf(request.form.get('csrf_token'))

    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    confirmPassword = request.form.get('confirmPassword')

    try:
        User.supabase_signup_wrapper(email, password, name)
        flash('Account created successfully!', 'success')

        # Signup Success. confirm from email.
        return redirect(url_for('common.index'))

    except AuthApiError as e:
        print(e.status, e.message)
        if e.status == 422:
            print("Invalid Format:", e.message)
        else:
            print("UNHANDLED ERROR:", e.message)

    # There was some error with signup
    return redirect(url_for('common.index', signupform=request.form))


@auth.route('/logout')
@flask_login.login_required
def logout():
    supabase_anon.auth.sign_out()
    flask.session.clear()
    flask_login.logout_user()
    flash('Logged out successfully!', 'success')
    print("Logged Out!")
    return redirect(url_for('common.index'))
