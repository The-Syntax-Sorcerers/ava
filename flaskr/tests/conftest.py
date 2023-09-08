import pytest
from flaskr.models.flaskforms import SignupForm
from bs4 import BeautifulSoup as bs

from flaskr.__init__ import app

# Used to sign up the user
from flask import Flask, render_template 
from flaskr.blueprints.auth import auth
from flaskr.blueprints.common import common
from flaskr.blueprints.subjects import subjects

# Used for cleanup
from flaskr.models.models import User

# Creates a test version of the application
@pytest.fixture
def signup_app():
    signup_app = Flask(__name__)
    signup_app.config.from_mapping(SECRET_KEY='chutiya')
    signup_app.config['TESTING'] = True
    # Disable CSRF protection for testing
    signup_app.config['WTF_CSRF_ENABLED'] = False

    # Adding the routes to this app
    signup_app.register_blueprint(auth)
    signup_app.register_blueprint(common)
    signup_app.register_blueprint(subjects)
    
    yield signup_app

    # Cleaning up created test user
    User.delete_test_user()

# Generates a test client to simulate HTTP requests
@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

# Generates a test client for signing up
@pytest.fixture
def signup_client(signup_app):
    with signup_app.test_client() as signup_client:
        yield signup_client

# Generates a test client with a user who has already logged in
@pytest.fixture
def auth_client(client):

    # not in the correct format
    test_email = "test@gmail.com"
    test_password = "test"

    head= {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'}

    r = client.get('/')

    soup = bs(r.text, 'html.parser')
    csrf_token = soup.find('input', {'id': 'csrf_token'})['value']

    r = client.post('/', data={'csrf_token': csrf_token, 'email': test_email, 'password': test_password}, headers=head, follow_redirects=True)

    yield client

    client.get('/logout', follow_redirects=True)
