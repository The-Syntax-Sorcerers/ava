from waitress import serve
from main import create_app

if __name__ == "__main__":
    serve(create_app())
