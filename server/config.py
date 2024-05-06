from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
import secrets
db = SQLAlchemy()
migrate=Migrate()
bcrypt=Bcrypt()
# secret_key=secrets.token_urlsafe(32)
# print(secret_key)

def create_app():
    app = Flask(__name__)
    CORS(app,supports_credentials=True)
    app.config['SECRET_KEY']='Ajt5QZmdz8STQRTSh_F4UOZ0RhRHZaouVlHXHEcyiTc'#secret key
    app.config['JWT_SECRET_KEY']='1QB3nZs72ocmtA8yJEjWFIFnbQSbGRPKqe3Pa3i78ik'#secret key
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 600
    app.config["SQLALCHEMY_DATABASE_URI"]='sqlite:///weather.db'
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    jwt=JWTManager(app) #create a jwt token


    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app) #attach a jwt token to the app
    migrate.init_app(app,db)
    
    return app