import pytest

PRIVATE_ROUTES_TESTCASES = [('/dashboard', 200),
                            ('/subjects/COMP123456', 200),
                            ('/assignments', 200),
                            ('/subjects/COMP123456', 200),
                            ('/subjects/COMP123456/1', 200),
                            ('/invalid_route', 404)
                            ]


@pytest.mark.parametrize("route,response_code", PRIVATE_ROUTES_TESTCASES)
def test_private_routes(auth_client, route, response_code):
    response = auth_client.get(route, follow_redirects=True)
    assert response.status_code == response_code


# Checks that the dashboard page can't be accessed by an unauthenticated user
def test_dashboard_unauthorised_redirect(client):
    response = client.get('/dashboard', follow_redirects=False)
    # Checks that dashboard is trying to redirect the user to the login page and then return them after authenticating
    assert response.status_code == 302
    assert len(response.history) == 0
    assert response.location == '/?next=%2Fdashboard'

    # Follows that redirect to make sure it works
    response = client.get('/dashboard', follow_redirects=True)
    assert response.status_code == 200
    assert len(response.history) == 1
    assert response.request.path == '/'
