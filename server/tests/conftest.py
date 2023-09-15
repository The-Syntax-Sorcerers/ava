import pytest
from server.models.flaskforms import SignupForm
from bs4 import BeautifulSoup as bs

from server import app

# Used to sign up the user
from flask import Flask, render_template 
from server.blueprints.auth import auth
from server.blueprints.common import common
from server.models import Subject

# Used for cleanup
from server.models import User

TEST_EMAIL = "test@gmail.com"
TEST_PASSWORD = "test"

URL_HEADER = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'}


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
    signup_app.register_blueprint(Subject)
    
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
    csrf_token = getCSRFToken(client, '/')

    r = client.post('/', data={'csrf_token': csrf_token, 'email': TEST_EMAIL, 'password': TEST_PASSWORD}, headers=URL_HEADER, follow_redirects=True)

    print("is this working??")
    print(r.text)

    yield client

    client.get('/logout', follow_redirects=True)


def getCSRFToken(running_client, form_URL):

    r = running_client.get(form_URL)
    soup = bs(r.text, 'html.parser')
    print(1)
    print(r.text)
    print(soup.find('login', {'id': 'csrf_token'}))
    csrf_token = soup.find('input', {'id': 'csrf_token'})['value']
    print(csrf_token)
    return csrf_token
