import pytest
from flaskr import app, User

# Generates a test client to simulate HTTP requests
@pytest.fixture#(scope="session")
def client():
    with app.test_client() as client:
        return client

# Generates a test client with a user who has already logged in
@pytest.fixture#(scope="session")
def authenticated_client():
    # Creating a dummy user
    user = User(tid=1, email='tester@email.com' ,name='Tester')

    client = app.test_client()

    # Authenticate the user by setting a user ID
    with client.session_transaction() as sesh:
        sesh['user_id'] = user.id
        
    return client
