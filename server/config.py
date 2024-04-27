from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
migrate=Migrate()
bcrypt=Bcrypt()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['JWT_SECRET_KEY']='36f410a833734793e99e130cf20a25af2b3de1175d02b8450b615c4660d57f02'
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 20000
    app.config["SQLALCHEMY_DATABASE_URI"]='sqlite:///weather.db'
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    jwt=JWTManager(app)


    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app,db)
    
    return app