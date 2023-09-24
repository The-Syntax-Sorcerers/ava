import pytest
# Testing public pages can be accessed from logged out users


PUBLIC_ROUTES_TESTCASES = [('/', 200),
                           ('/privacy_policy', 200),
                           ('/invalid_route', 404)
                           ]


@pytest.mark.parametrize("route,response_code", PUBLIC_ROUTES_TESTCASES)
def test_public_routes(client, route, response_code):
    response = client.get(route, follow_redirects=True)
    assert response.status_code == response_code
