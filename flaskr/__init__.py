import os

from flask import Flask, render_template, request, url_for, redirect


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        SQLALCHEMY_DATABASE_URI='sqlite:///flaskr.sqlite',
        SQLALCHEMY_TRACK_MODIFICATIONS=False
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        print("Exception Caught: ", OSError)

    # Class selection screen as the homepage
    @app.route('/')
    def homepage(name='homepage'):
        return render_template('home.html', name=name)
                               

    # a simple page that says hello
    @app.route('/upload',  methods=['GET', 'POST'])
    def upload(name='assignment upload'):
        if request.method == 'POST':
            return redirect(url_for('homepage'))
        return render_template('assignment_upload.html', name=name)

    # return Instance
    return app
