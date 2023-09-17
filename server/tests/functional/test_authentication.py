from server import User
from server.tests.conftest import get_CSRF_token, TEST_DATA
import pytest

SIGN_UP_TESTCASES = [([], 200),
                     ([('name', '')], 200),
                     ([('email', '')], 500),
                     ([('password', '')], 200),
                     ([('confirm_password', '')], 200),
                     ([('email', ''), ('name', '')], 500),
                     ]

# At the moment this is a broken test that will
# always pass as the username and password will never fail
LOGIN_TESTCASES = [([], '/dashboard'),
                   ([('email', 'no_user_will_exist_with_this_username')], '/'),
                   ([('password', 'this_is_the_incorrect_password')], '/')
                   ]


@pytest.mark.parametrize("changed_elems, route", LOGIN_TESTCASES)
def test_login(client, changed_elems, route):
    data = TEST_DATA.copy()
    data['csrf_token'] = get_CSRF_token(client, '/')
    for elem in changed_elems:
        data[elem[0]] = elem[1]
    response = client.post('/login', data=data, follow_redirects=True)
    assert response.status_code == 200
    assert response.request.path == route
    client.get('/logout', follow_redirects=True)


def test_correct_password(auth_client):
    """Test form submission with correct password."""
    # still not in the correct format

    response = auth_client.get('/dashboard', follow_redirects=True)
    assert response.status_code == 200


def test_incorrect_password(client):
    """Test form submission with incorrect password."""
    # still not in the correct format
    # need to get the csrf token for this page
    response = client.post('/login', data={'user': 'someuser',
                                           'password': 'wrong_pass'})
    assert response.status_code == 500


# Checks that the logout button redirects once and to the login page
def test_logout_redirect(client):
    response = client.get('/logout')
    # Attempting to redirect to the login page
    assert response.status_code == 302
    assert response.location == '/?next=%2Flogout'

    response = client.get('/logout', follow_redirects=True)
    # Succesfully redirects a single time
    assert response.status_code == 200
    assert len(response.history) == 1


@pytest.mark.parametrize("changed_elems,response_code", SIGN_UP_TESTCASES)
def test_signup_form(client, changed_elems, response_code):
    # Signs the user up and checks they are being redirected to login
    data = User.get_test_user()
    data['csrf_token'] = get_CSRF_token(client, '/')
    for elem in changed_elems:
        data[elem[0]] = elem[1]

    response = client.post('/signup', data=data, follow_redirects=True)
    assert response.status_code == response_code

    User.delete_test_user()
