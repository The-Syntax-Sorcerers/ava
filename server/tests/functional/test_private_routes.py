# Checks that the dashboard page can be accessed by an authenticated user
def test_dashboard_authorised(auth_client):
    response = auth_client.get('/dashboard', follow_redirects=True)
    assert response.status_code == 200

# Checks that the dashboard page can't be accessed by an unauthenticated user
def test_dashboard_unauthorised_redirect(client):
    response = client.get('/dashboard')
    # Checks that dashboard is trying to redirect the user to the login page and then return them after authenticating
    assert response.status_code == 302
    assert len(response.history) == 0
    assert response.location == '/?next=%2Fdashboard'

    # Follows that redirect to make sure it works
    response = client.get('/dashboard', follow_redirects=True)
    assert response.status_code == 200
    assert len(response.history) == 1
    assert response.request.path == '/'