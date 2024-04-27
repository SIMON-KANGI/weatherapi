from config import db,bcrypt
from sqlalchemy_serializer import SerializerMixin


# from sqlalchemy_serializer import SerializerMixin
class User(db.Model,SerializerMixin):
    __tablename__ = 'users'
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String())
    email=db.Column(db.String())
    _password=db.Column(db.String())
    location=db.relationship('Location',back_populates="user")
    def to_dict(self):
        location={}
        if self.location:
            location={
                'id': self.location.id,
                'name': self.location.name,
                'activity': self.location.activity,
                "weather": self.location.weather
            }
        return{
            "username": self.username,
            "email": self.email,
            "location":location
        }
    @property
    def password(self):
        return self._password
    @password.setter
    def password(self, plain_password_text):
        self._password = bcrypt.generate_password_hash(plain_password_text).decode('utf-8')  
    def check_password(self, password):
        return bcrypt.check_password_hash(self._password, password)
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

    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
    location = db.relationship('Location', back_populates='weather')
    
    def to_dict(self):
        location_data={}
        if self.location:
            location_data={
                'id': self.location.id,
                'name': self.location.name,
                'activity': self.location.activity,
                
            }
            return{
                'id': self.id,
                'temperature': self.temperature,
                'humidity': self.humidity,
                'windspeed': self.windspeed,
                'rain_level': self.rain_level,
                'state': self.state,
                'location': location_data
            }
            

class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String())
    activity = db.Column(db.String())
    date_created = db.Column(db.DateTime(), server_default=db.func.now())
    date_updated = db.Column(db.DateTime(), onupdate=db.func.now())
    weather = db.relationship('Weather', back_populates='location', uselist=False)
    user_id=db.Column(db.Integer(), db.ForeignKey('users.id'))
    user=db.relationship('User', back_populates='location')
    def to_dict(self):
        weather_data = {}
        users={}
        if self.weather:
            weather_data = {
                'state': self.weather.state,
                'temperature': self.weather.temperature,
                'humidity': self.weather.humidity,
                'windspeed': self.weather.windspeed,
                'rain_level': self.weather.rain_level,
                'activity': self.weather.activity,
               
            }
        elif self.user:
            users={
                'username':self.user.username,
                'email':self.user.email
            }
        return {
            'id': self.id,
            'name': self.name,
            'activity': self.activity,
            'weather': weather_data,
            'users': users,
            'date_created': self.date_created,
            'date_updated': self.date_updated
        }
