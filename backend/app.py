from flask import Flask, jsonify, request
from db import create_tables
from werkzeug.security import check_password_hash, generate_password_hash
import baby_tracker_controller

app = Flask(__name__)


@app.route('/register', methods=['POST'])
def register():
    user_details = request.get_json()
    username = user_details['username']
    password = user_details['password']
    hashed_password = generate_password_hash(password)
    print(username, hashed_password)

    result = baby_tracker_controller.insert_user(username, hashed_password)

    print(result)

    response = {'message': 'User added'}
    return jsonify(response)


@app.after_request
def after_request(response):
    # <- You can change "*" for a domain for example "http://localhost"
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
    return response


if __name__ == "__main__":
    create_tables()
    app.run(debug=False)
