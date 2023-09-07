import pytest
from flaskr import User, app
from bs4 import BeautifulSoup as bs
from flaskr.extensions import load_from_env


# Generates a test client to simulate HTTP requests
@pytest.fixture#(scope="session")
def client():
    load_from_env(["SUPABASE_ANON_KEY", "SUPABASE_PUBLIC_KEY","SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SECRET_KEY", "SUPABASE_URL"])
    with app.test_client() as client:
        yield client

# Generates a test client with a user who has already logged in
@pytest.fixture(scope="session")
def auth_client(client):

    # not in the correct format
    test_email = "test@gmail.com"
    test_password = "test"

    head= {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'}

    r = client.get('/')

    soup = bs(r.text, 'html.parser')
    csrf_token = soup.find('input', {'id': 'csrf_token'})['value']

    r = client.post('/', data={'csrf_token': csrf_token, 'email': test_email, 'password': test_password}, headers=head, follow_redirects=True)

    yield client

    client.get('/logout', follow_redirects=True)
