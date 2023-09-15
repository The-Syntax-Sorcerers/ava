# Testing public pages can be accessed from logged out users

# Checks that the login page can be accessed
def test_login(auth_client):
    response = auth_client.get('/')
    # assert b"<title>Log In</title>" in response.data
    assert response.status_code == 200

# Checks that the privacy policy page can be accessed
def test_privacy_policy(client):
    response = client.get('/privacy_policy')
    # assert b"<title>Privacy Policy</title>" in response.data
    assert response.status_code == 200

# Checks that the profile page can be accessed
def test_profile(client):
    response = client.get('/profile')
    # assert b"<title>Profile Page</title>" in response.data
    assert response.status_code == 200

# # Checks that the email confirmation page can be accessed
# def test_email_confirm(client):
#     response = client.get('/email')
#     assert b"  <title>Email Confirmed</title>" in response.data
#     assert response.status_code == 200

# Checks that invalid routes return an error
def test_invalid_route(client):
    response = client.get('/invalid_route')
    assert response.status_code == 404