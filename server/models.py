from config import db,bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

# from sqlalchemy_serializer import SerializerMixin
class Weather(db.Model, SerializerMixin):
    __tablename__ = 'weathers'
    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String())
    temperature = db.Column(db.Float)
    humidity = db.Column(db.Float)
    windspeed = db.Column(db.Float)
    rain_level = db.Column(db.Float)
    activity = db.Column(db.String)
    date_created = db.Column(db.DateTime, server_default=db.func.now())
    date_updated = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    location = db.relationship('Location', back_populates='weather')
    
    def to_dict(self):
        return {
            'id': self.id,
            'temperature': self.temperature,
            'humidity': self.humidity,
            'windspeed': self.windspeed,
            'rain_level': self.rain_level,
            'state': self.state,
            'location': [loc.to_dict() for loc in self.location]
        }


class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'
    serialize_only = ('name', 'activity', 'weather', 'users', 'date_created', 'date_updated')
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(20))
    activity = db.Column(db.String())
    date_created = db.Column(db.DateTime(), server_default=db.func.now())
    date_updated = db.Column(db.DateTime(), onupdate=db.func.now())
    weather_id = db.Column(db.Integer, db.ForeignKey('weathers.id'))
    weather = db.relationship('Weather', back_populates='location', uselist=False)
    users = db.relationship('User', back_populates='location')
    
    def to_dict(self):
        weather_data = None
        if self.weather:
            weather_data = {
                'state': self.weather.state,
                'temperature': self.weather.temperature,
                'humidity': self.weather.humidity,
                'windspeed': self.weather.windspeed,
                'rain_level': self.weather.rain_level,
            }
        
        return {
            'id': self.id,
            'name': self.name,
            'activity': self.activity,
            'weather_id': self.weather_id,
            'weather': weather_data,
            'users': [{'id': user.id, 'username': user.username, 'email': user.email} for user in self.users],
            'date_created': self.date_created,
            'date_updated': self.date_updated
        }


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_only = ('username', 'email', 'location')
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String())
    email = db.Column(db.String())
    _password = db.Column(db.String())
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
    location = db.relationship('Location', back_populates="users")
    
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "location": self.location.to_dict() if self.location else None
        }
    
    @property
    def password(self):
        return self._password
    
    @password.setter
    def password(self, plain_password_text):
        self._password = bcrypt.generate_password_hash(plain_password_text).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self._password, password)
    
    @validates('username')
    def validate_name(self, key, username):
        existing_name = User.query.filter_by(username=username).first()
        if existing_name and existing_name.id != self.id:
            raise ValueError('Name already exists')
        return username
