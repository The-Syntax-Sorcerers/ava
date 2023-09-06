# Checks that the dashboard page can be accessed
def test_dashboard_authorised(authenticated_client):
    response = authenticated_client.get('/dashboard')
    assert response.status_code == 200

# Testing that private pages can't be accessed by logged out users and they get redirected to login

# Checks that the dashboard page can't be accessed by an unauthorised user
def test_dashboard_unauthorised_redirect(client):
    # Checks that a redirect request is being being to the login page
    response = client.get('/dashboard')
    assert response.status_code == 302
    assert len(response.history) == 0
    # Sends the user to the login page but redirects them back to the dashboard after authenticating
    assert response.location == '/?next=%2Fdashboard'

    # Follows that redirect to make sure it works
    response = client.get('/dashboard', follow_redirects=True)
    assert response.status_code == 200
    # One Redirect
    assert len(response.history) == 1
    # Redirected to login
    assert response.request.path == '/'

