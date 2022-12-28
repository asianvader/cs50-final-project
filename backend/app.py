from flask import Flask, jsonify, request
from db import create_tables
from werkzeug.security import check_password_hash, generate_password_hash
import baby_tracker_controller
from datetime import datetime, timedelta, timezone
import json

from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app) 

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


@app.route('/login', methods=['POST'])
def login():
    print('LOGIN')
    user_details = request.get_json()
    username = user_details['username']
    password = user_details['password']
    print(username, password)

    # Check db
    result = baby_tracker_controller.check_user(username)
    # Ensure username exists and password is correct
    print(result)
    if len(result) != 1 or not check_password_hash(result[0]["hash"], password):
        response = {'message': "User doesn't exist or password isn't correct. Please try again."}
        return jsonify(response)
        # TODO Add error message

    else:
        access_token = create_access_token(identity=username)
        # response = {'message': username}
        response = {"access_token":access_token}
        return jsonify(response)

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    print("logout")
    return response

@app.after_request
def after_request(response):
    # <- You can change "*" for a domain for example "http://localhost"
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"

    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
                print(response)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


if __name__ == "__main__":
    create_tables()
    app.run(debug=False)
