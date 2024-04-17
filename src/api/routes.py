import os
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User
from api.utils import APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the Google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route("/signup", methods=["POST"])
def signup():
    request_body = request.get_json(force=True)

    required_fields = ["email", "password"]
    for field in required_fields:
        if field not in request_body or not request_body[field]:
            raise APIException(f'The "{field}" field cannot be empty', 400)

    verify_email = User.query.filter_by(email=request_body["email"]).first()
    if verify_email:
        raise APIException("An account with this email already exists", 400)

    user = User(email=request_body["email"], password=request_body["password"],is_active=True)

    db.session.add(user)

    try:
        db.session.commit()
    except:
        raise APIException('Internal error', 500)

    response_body = {
        "msg": "Successfully created user",
        "user": user.serialize()
    }

    return jsonify(response_body), 200


@api.route('/login', methods=['POST'])
def login():
    request_body = request.get_json(force=True)
    email = request_body["email"]
    password = request_body["password"]

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify("Credenciales incorrectas"), 401

    access_token = create_access_token(identity=user.id)
    print(access_token)

    response_body = {
        "msg": "logged",
        "user": user.serialize(),
        "token": access_token
    }
    print(response_body),
    return jsonify(response_body), 200

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user).first()

    if not user:
        return jsonify(success=False, message='User not found'), 404
    
    response_body = {
        "logged_in_as": current_user,
        "user": user.serialize()
    }

    return jsonify(success=True, response=response_body), 200

# """
# This module takes care of starting the API Server, Loading the DB and Adding the endpoints
# """
# from flask import Flask, request, jsonify, url_for, Blueprint
# from api.models import db, User
# from api.utils import generate_sitemap, APIException
# from flask_cors import CORS
# from flask_jwt_extended import create_access_token
# from flask_jwt_extended import get_jwt_identity
# from flask_jwt_extended import jwt_required
# from flask_jwt_extended import JWTManager
# from werkzeug.security import generate_password_hash, check_password_hash
# import os
# from dotenv import load_dotenv

# # # Allow CORS requests to this API
# # CORS(api)

# api = Blueprint('api', __name__)

# load_dotenv()

# salt = os.getenv('HASH_SALT')


# @api.route('/signup', methods=['POST'])
# def handle_signup():
#     email = request.json.get("email", None)
#     username = request.json.get("username", None)
#     password = request.json.get("password", None)

#     existing_user = User.query.filter_by(username=username).first()
#     existing_email = User.query.filter_by(email=email).first()
#     if email is None or username is None or password is None:
#         return jsonify({"msg": "Please supply a valid email, username, and password."}), 400
#     elif existing_user is not None and existing_email is not None:
#         return jsonify({"msg": "Username and Email already in use."}), 400
#     elif existing_user is not None:
#         return jsonify({"msg": "Username already in use."}), 400
#     elif existing_email is not None:
#         return jsonify({"msg": "Email already in use."}), 400
#     else:
#         user = User(email = email, username = username, password = generate_password_hash(password), is_active = True)
#         db.session.add(user)
#         db.session.commit()
#         return jsonify({"msg": "New user created successfully.", "status": "ok"}), 200
    
# @api.route('/login', methods=['POST'])
# def handle_login():
#     username = request.json.get("username", None)
#     password = request.json.get("password", None)

#     user = User.query.filter_by(username=username).first()
#     if user is None:
#         return jsonify({"msg": "Incorrect username."}), 401
#     if check_password_hash(user.password, password):
#         access_token = create_access_token(identity=user.id)
#         return jsonify({ "token": access_token, "user_id": user.id })
#     else:
#         return jsonify({"msg": "Incorrect password."}), 401

# @api.route('/private', methods=['GET'])
# @jwt_required()
# def handle_private_info():
#     current_user_id = get_jwt_identity()
#     user = User.query.get(current_user_id)
#     if user is not None:
#         return jsonify({"user": user.serialize(), "status": "ok"}), 200
#     else: 
#         return jsonify({"msg": "You must be logged in to view this information."})




# # @api.route('/hello', methods=['POST', 'GET'])
# # def handle_hello():

# #     response_body = {
# #         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
# #     }

# #     return jsonify(response_body), 200
