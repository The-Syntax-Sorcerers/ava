import os

from flask import Blueprint, send_from_directory


common = Blueprint('common', __name__, static_folder=os.getcwd()+"/client/dist")


@common.route('/')
def landing():
    print("Serving Landing")
    return send_from_directory(common.static_folder, 'index.html')
