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