from flask import Flask, request, jsonify, session, render_template, make_response
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
from flask_session import Session
from sqlalchemy import func
from flask_mail import Mail, Message
from config import ApplicationConfig
from models import db, User, Order, Price
import os

app = Flask(__name__, static_folder='client/build', static_url_path='')
# CORS(app, supports_credentials=True)

app.config.from_object(ApplicationConfig)

CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

app.config['SECRET_KEY'] = 'a really really really really long secret key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:pass@localhost/flask_app_db'
app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'cithicom436@gmail.com'
app.config['MAIL_DEFAULT_SENDER'] = 'cithicom436@gmail.com'
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
mail = Mail(app)


with app.app_context():
    db.create_all()
    service_prices = {
        "Logotype": 100,
        "Landing page": 500,
        "Set of icons": 300,
        "Website": 1000,
        "Prevention": 200,
        "Repair": 300,
        "Equipment": 100,
        "Diagnostics": 150,
        "Coding": 1500,
        "Consultancy": 200,
        "Testing": 500,
        "Development": 3000,
        "Логотип": 100,
        "Посадкова сторінка": 500,
        "Набір іконок": 300,
        "Веб-сайт": 1000,
        "Профілактика": 200,
        "Ремонт": 300,
        "Комплектація": 100,
        "Діагностика": 150,
        "Верстання": 1500,
        "Консультування": 200,
        "Тестування": 500,
        "Розробка": 3000
    }
    for service, price in service_prices.items():
        existing_price = Price.query.filter_by(name_service=service, price=price).first()
        if existing_price is None:
            new_price = Price(name_service=service, price=price)
            db.session.add(new_price)
        else:
            existing_price.price = price
    db.session.commit()



@app.route('/')
@cross_origin()
def index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route("/register", methods=["POST"])
def register_user():
    username = request.json["username"]
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email.lower()).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409


    new_user = User(username=username, email=email.lower(), password=password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id
    response = jsonify({'message': 'success'})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')

    return jsonify({
        "status": "ok",
        "message": f'Welcome {new_user.username}!',
        "data": {
            "id": new_user.id,
            "email": new_user.email,
            "username": new_user.username
        }
    })


@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email.lower()).first()

    if user is None:
        return jsonify({"status": "error", "messageErr": "Unauthorized"}), 401

    if password != user.password:
        return jsonify({"status": "error", "messageErr": "Unauthorized"}), 401

    session["user_id"] = user.id

    return jsonify({
        "status": "ok",
        "message": f'Welcome {user.username}!',
        "data": {
            "id": user.id,
            "email": user.email,
            "username": user.username
        }
    })

@app.route('/add_order', methods=['POST'])
def add_record():

    user_id = request.json.get('user_id')
    price_id = request.json.get('price_id')
    print(request.json)

    # Getting price data from prices table
    name_service = Price.query.get(price_id).name_service
    price_value = Price.query.get(price_id).price
    print(user_id, type(user_id))
    print(price_id, type(price_id))
    print(name_service, type(name_service))
    print(price_value, type(price_value))
    # Creating a new order
    new_order = Order(user_id=user_id, price_id=int(price_id), name_service=name_service, price=price_value)
    db.session.add(new_order)
    db.session.commit()

    return jsonify({"status": "ok", 'success': True})

@app.route('/user_orders/<string:user_id>', methods=['GET'])
def get_user_orders(user_id):
    orders = db.session.query(Order.user_id,
                              Order.price_id,
                              func.count(Order.price_id).label('count_item'),
                              Order.name_service,
                              Order.price,
                              func.sum(Order.price).label('cost'),
                              Order.order_date
                              ).filter_by(user_id=user_id
                                          ).group_by(Order.user_id,
                                                     Order.name_service,
                                                     Order.price
                                                     ).order_by(Order.order_date.desc()
                                                                ).all()
    # List for storing results
    orders_list = []

    # We go through all the orders and add them to the list of results
    for order in orders:
        # We get information about the price and service for this order from related tables
        price = Price.query.filter_by(id=order[1]).first()
        service_name = price.name_service

        # Get a list of orders for a specific price_id
        orders_for_price_id = db.session.query(Order).filter_by(price_id=order[1], user_id=user_id).all()

        # Create a list of orders and add each order to it
        orders_for_price_id_list = []
        for order_for_price_id in orders_for_price_id:
            order_for_price_id_data = {
                'id': order_for_price_id.id,
                'user_id': order_for_price_id.user_id,
                'count_item': 1,
                'name_service': service_name,
                'price': order_for_price_id.price,
                'cost': order_for_price_id.price,
                'order_date': order_for_price_id.order_date.strftime('%d/%m/%Y')
            }
            orders_for_price_id_list.append(order_for_price_id_data)

        # Create a dictionary with order data and add it to the list
        order_data = {
            'user_id': order[0],
            'count_item': order[2],
            'name_service': service_name,
            'price': order[-3],
            'cost': order[-2],
            'order_date': order[-1].strftime('%d/%m/%Y'),
            'orders_for_price_id': orders_for_price_id_list
        }
        orders_list.append(order_data)

    # Returning results as a JSON object
    return jsonify({'orders': orders_list})

@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_record(id):
    order = Order.query.get(id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': f'Order with id {id} has been deleted.'}), 200


@app.route('/send_password', methods=['POST'])
def send_password():
    email = request.json.get('email')
    print(email)
    user = User.query.filter_by(email=email.lower()).first()

    if user is None:
        return 'Пользователь с таким email не найден'

    password = user.password
    msg = Message('Ваш пароль', recipients=[email])
    msg.body = f'Ваш пароль: {password}'
    mail.send(msg)

    return jsonify({"status": "ok", 'success': True})

@app.route("/logout", methods=["POST"])
def logout_user():
    session.clear()
    return {"message": "User logged out successfully"}


if __name__ == "__main__":
    app.run(debug=True)

