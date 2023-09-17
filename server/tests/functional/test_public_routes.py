import pytest
# Testing public pages can be accessed from logged out users


ROUTES_TESTCASES = [('/', 200),
                    ('/privacy_policy', 200),
                    ('/profile', 200),
                    ('/invalid_route', 404)
                    ]


@pytest.mark.parametrize("route,response_code", ROUTES_TESTCASES)
def test_routes(client, route, response_code):
    response = client.get(route)
    assert response.status_code == response_code
