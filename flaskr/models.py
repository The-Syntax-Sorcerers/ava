from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from .extensions import db


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    name = db.Column(db.String(128))
    faculty = db.Column(db.String(100))

    # def __init__(self, id, email, password_hash, first_name, last_name, faculty):
    #     self.constructed = True

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User> id: {self.id}, email: {self.email}, first: {self.name}'

# class Subject(db.Model):
#     subject_code = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100))
#     year = db.relationship('City', back_populates='country')
#
#
# class City(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100))
#     country_id = db.Column(db.ForeignKey("country.id"))
#     country = db.relationship('Country', back_populates='cities')
