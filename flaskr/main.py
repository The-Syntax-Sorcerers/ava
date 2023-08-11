import os
from flask import Flask, render_template, Blueprint

app = Blueprint('main', __name__)

# a simple page that says hello
@app.route('/')
def homepage():
    return 'Homepage: Hello, World!'


# a simple page that says hello
@app.route('/hello')
def hello():
    return 'Hello, World!'


