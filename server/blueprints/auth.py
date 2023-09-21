import json
import os

import flask
import flask_login
import flask_wtf.csrf
from flask import Blueprint, flash, redirect, url_for, request
from gotrue.errors import AuthApiError
from postgrest import APIError

from server.extensions import supabase_anon, set_cookies, get_cookies, clear_cookies
from server.models.flaskforms import LoginForm
from server.models import User

auth = Blueprint('auth', __name__, template_folder=os.getcwd() + "/client/dist",
                 static_folder=os.getcwd() + "/client/dist")


@auth.route('/login', methods=["POST"])
def login():
    print("Serving Login Route!")
    if flask_login.current_user.is_authenticated:
        return redirect(url_for('common.dashboard'))

    temp_cookies = {}

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

        clear_cookies()
        return redirect(url_for('common.dashboard'))

    except AuthApiError as e:
        temp_cookies = {
            "showModal": True,
            "showLogin": True,
            "status": e.status,
            "login_error": e.message,
            "loginform": request.form
        }

    set_cookies(temp_cookies)
    return redirect(url_for('common.dashboard'))


@auth.route('/signup', methods=['POST'])
def signup():
    print("Serving Signup Route!")
    print(flask_login.current_user)
    if flask_login.current_user.is_authenticated:
        return redirect(url_for('common.dashboard'))

    temp_cookies = {}

    # Validating CSRF token prevents Cross-site forgery attacks!!
    flask_wtf.csrf.validate_csrf(request.form.get('csrf_token'))

    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    confirmPassword = request.form.get('confirmPassword')

    if password != confirmPassword:
        temp_cookies = {
            "showModal": True,
            "showLogin": False,
            "status": 400,
            "signup_error": "Passwords do not match!!",
            "signupform": request.form
        }

    else:
        try:
            User.supabase_signup_wrapper(email, password, name)
            flash('Account created successfully!', 'success')

            temp_cookies = {
                "status": 200,
                "signup_error": "Sign up Success!!",
            }

            # Signup Success. confirm from email.
            set_cookies(temp_cookies)
            return redirect(url_for('common.index'))

        except (AuthApiError, APIError) as e:
            if e is AuthApiError:

                temp_cookies = {
                    "showModal": True,
                    "showLogin": False,
                    "status": e.status,
                    "signup_error": e.message,
                    "signupform": request.form
                }
            elif e is APIError:
                temp_cookies = {
                    "showModal": True,
                    "showLogin": False,
                    "status": e.code,
                    "signup_error": "User email already exists!",
                    "signupform": request.form
                }
            else:
                print("SOMETHING IS WRONG!!!")

    # There was some error with signup
    set_cookies(temp_cookies)
    return redirect(url_for('common.index'))


@auth.route('/logout')
@flask_login.login_required
def logout():
    supabase_anon.auth.sign_out()
    flask.session.clear()
    flask_login.logout_user()
    flash('Logged out successfully!', 'success')
    print("Logged Out!")
    return redirect(url_for('common.index'))
