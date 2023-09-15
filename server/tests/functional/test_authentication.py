def test_signup_form(signup_client):
    # Signs the user up and checks they are being redirected to login
    response = signup_client.post('/signup', data={'name': 'Test Name', 
                                            'email': 'nonrealuserfortesting@gmail.com', 
                                            'password': 'secret_password', 
                                            'confirm_password': 'secret_password'
                                            })

    assert response.status_code == 302
    assert response.location == '/'  

def test_correct_password(auth_client):
    """Test form submission with correct password."""
    # still not in the correct format

    # response = client.post('/', data={'user': 'Test Name', 'password': 'secret_password'})
    # assert response.status_code == 302
    # assert response.location == '/dashboard'

    response = auth_client.post('/dashboard', follow_redirects=True)
    assert response.status_code == 200

def test_incorrect_password(client):
    """Test form submission with incorrect password."""
    # still not in the correct format
    # need to get the csrf token for this page
    response = client.post('/login', data={'user': 'someuser', 'password': 'wrong_pass'})
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

# def test_signup_no_name(signup_client):
#     # still not in the correct format
#     response = signup_client.post('/signup', data={'name': '', 'email': 'test@email.com', 'password': 'secret_password', 'confirm_password': 'secret_password'})
#     assert response.status_code == 200

# def test_signup_no_email(signup_client):
#     # still not in the correct format
#     response = signup_client.post('/signup', data={'name': 'Test Name', 'email': '', 'password': 'secret_password', 'confirm_password': 'secret_password'})
#     assert response.status_code == 200

# def test_signup_no_password(signup_client):
#     # still not in the correct format
#     response = signup_client.post('/signup', data={'name': 'Test Name', 'email': 'test@email.com', 'password': '', 'confirm_password': 'secret_password'})
#     assert response.status_code == 200

# def test_signup_no_confirm_password(signup_client):
#     # still not in the correct format
#     response = signup_client.post('/signup', data={'name': 'Test Name', 'email': 'test@email.com', 'password': 'secret_password', 'confirm_password': ''})
#     print(response.data)
#     assert response.status_code == 200