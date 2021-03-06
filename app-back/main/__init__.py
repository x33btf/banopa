import datetime
import logging as log
import os
import random
import json

import coloredlogs
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt_identity,
    jwt_required,
)

# local imports
from config import app_config

from .db import MongoDB

from .services.restaurant_service import RestaurantService


def create_app(config_name):
    config_name = "dev" if not config_name else config_name
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    app.config.from_pyfile("config.py")
    app.config["log"] = log

    cors = CORS(app)
    app.config["CORS_HEADERS"] = "Content-Type"
    app.config["CORS_SEND_WILDCARD"] = True

    app.config["JWT_SECRET_KEY"] = "9MZbGqQHaC47SSKyKaTK"
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    app.config["JWT_BLACKLIST_ENABLED"] = True
    app.config["JWT_BLACKLIST_TOKEN_CHECKS"] = ["access", "refresh"]
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(days=10)
    app.config["jwt"] = JWTManager(app)
    app.config["flask_bcrypt"] = Bcrypt(app)
    jwt = app.config["jwt"]

    # Swagger UI config
    app.config.SWAGGER_UI_JSONEDITOR = True
    app.config.SWAGGER_UI_DOC_EXPANSION = "full"  # none, list, full

    with app.app_context():
        db = MongoDB()
        rest_serv = RestaurantService()
        k = random.randint(10,20)
        rest_sample = random.choices(json.load(open('app-back/rest-sample.json', 'r')), k=k)
        for rest in rest_sample:
            rest_serv.add(rest)

    @jwt.token_in_blacklist_loader
    def check_if_token_in_blacklist(decrypted_token):
        blacklist = set()
        jti = decrypted_token["jti"]
        return jti in blacklist

    @app.route("/")
    def hello_world():
        # render home template
        return "Hello, World!"

    return app
