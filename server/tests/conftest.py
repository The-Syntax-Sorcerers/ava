import pytest
from bs4 import BeautifulSoup as bs

from server import app

# Used to sign up the user
from flask import Flask
from server.blueprints.auth import auth
from server.blueprints.common import common

# Used for cleanup
from server.models import User

TEST_USER_DATA = {'email': "test@gmail.com",
                  'password': "test"}

TEST_TEACHER_DATA = {'email': "prof@gmail.com",
                     'password': "prof"}

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
    login_test_user(client, TEST_USER_DATA)
    yield client
    client.get('/logout', follow_redirects=True)


@pytest.fixture
def auth_teacher_client(client):
    login_test_user(client, TEST_TEACHER_DATA)
    yield client
    client.get('/logout', follow_redirects=True)

def login_test_user(client, login_data):
    data = login_data.copy()
    data['csrf_token'] = get_CSRF_token(client, '/')
    client.post('/', data=data, follow_redirects=True)


def get_CSRF_token(running_client, form_URL):
    r = running_client.get(form_URL)
    soup = bs(r.text, 'html.parser')
    csrf_token = soup.find('meta', {'id': 'csrf-token'})['content']
    return csrf_token
