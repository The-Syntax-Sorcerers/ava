import flask_wtf
from flaskr import User

def test_correct_password(client):
    """Test form submission with correct password."""
    # not in the correct format
    response = client.post('/', data={'user': 'someuser', 'password': 'secret_password'})
    print(response.data)
    assert b'Password is correct!' in response.data
    assert response.status_code == 200

def test_incorrect_password(client):
    """Test form submission with incorrect password."""
    # still not in the correct format
    response = client.post('/', data={'user': 'someuser', 'password': 'wrong_pass'})
    assert response.status_code == 200

def test_signup(client, app):
    # still not in the correct format
    response = client.post('/signup', data={'name': 'Test Name', 'email': 'test@email.com', 'password': 'secret_password', 'confirm_password': 'secret_password'})
    
    with app.app_context():
        assert User.query.count() == 1
        assert response.status_code == 200

def test_signup_no_name(client):
    # still not in the correct format
    response = client.post('/signup', data={'name': '', 'email': 'test@email.com', 'password': 'secret_password', 'confirm_password': 'secret_password'})
    assert response.status_code == 200

def test_signup_no_email(client):
    # still not in the correct format
    response = client.post('/signup', data={'name': 'Test Name', 'email': '', 'password': 'secret_password', 'confirm_password': 'secret_password'})
    assert response.status_code == 200

def test_signup_no_password(client):
    # still not in the correct format
    response = client.post('/signup', data={'name': 'Test Name', 'email': 'test@email.com', 'password': '', 'confirm_password': 'secret_password'})
    assert response.status_code == 200

def test_signup_no_confirm_password(client):
    # still not in the correct format
    response = client.post('/signup', data={'name': 'Test Name', 'email': 'test@email.com', 'password': 'secret_password', 'confirm_password': ''})
    assert response.status_code == 200

# Checks that the logout button redirects once and to the login page
def test_logout_redirect(client):
    response = client.get('/logout', follow_redirects=True)
    # Redirects
    assert response.status_code == 200
    # Redirects once
    assert len(response.history) == 1
    # Redirects to login page
    assert response.location == '/'