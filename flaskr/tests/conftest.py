import pytest
from flaskr import User, app

# Generates a test client to simulate HTTP requests
@pytest.fixture#(scope="session")
def client():
    with app.test_client() as client:
        yield client

# Generates a test client with a user who has already logged in
@pytest.fixture#(scope="session")
def authenticated_client(client):
    # Creating a dummy user
    user = User(tid=1, email='tester@email.com' ,name='Tester')

    # Authenticate the user by setting a user ID
    with client.session_transaction() as sesh:
        sesh['user_id'] = user.id
        
    yield client
