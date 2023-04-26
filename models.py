from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from datetime import datetime


db = SQLAlchemy()

def get_uuid():
    return uuid4().hex


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String(345), nullable=False)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)


class Order(db.Model):
    __tablename__ = "orders"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False)
    price_id = db.Column(db.Integer, db.ForeignKey('prices.id'), nullable=False)
    name_service = db.Column(db.String(345), nullable=False)
    price = db.Column(db.Float)
    order_date = db.Column(db.DateTime, default=datetime.utcnow)


class Price(db.Model):
    __tablename__ = "prices"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name_service = db.Column(db.String(345), nullable=False)
    price = db.Column(db.Float, nullable=False)