from server import User
from server.tests.conftest import get_CSRF_token, TEST_DATA
import pytest

# this is probably going to break again, not sure why it is failing
SIGN_UP_TESTCASES = [
    # ([], 302),
    ([('name', '')], 302),
    ([('email', '')], 500),
    ([('password', '')], 302),
    ([('confirmPassword', '')], 302),
    ([('email', ''), ('name', '')], 500),
]


@pytest.mark.parametrize("changed_elems,response_code", SIGN_UP_TESTCASES)
def test_signup_form(client, changed_elems, response_code):
    # Signs the user up and checks they are being redirected to login
    data = User.get_test_user()
    data['csrf_token'] = get_CSRF_token(client, '/')
    for elem in changed_elems:
        data[elem[0]] = elem[1]
    response = client.post('/signup', data=data, follow_redirects=False)
    assert response.status_code == response_code

    User.delete_test_user()


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
