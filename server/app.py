from config import create_app,db
from flask import request,jsonify,make_response,flash,session
from flask_restful import Api,Resource
from models import Weather,Location,User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity,unset_jwt_cookies #import the jwt extensions

app=create_app()
api=Api(app)
@app.route('/')
def hello_world():
    return '<h1>This is a weather api</h1>'



 
class Login(Resource):
    
    def post(self):
        data = request.get_json()
        if 'username' not in data or 'password' not in data:
            return jsonify({'message': 'Username and password are required'}), 400
    
        username = data['username']
        password = data['password']
        user = User.query.filter(User.username == username).first()
        if not user or not user.check_password(password):
            flash('Invalid password or username', category='danger')
            return jsonify({'message': 'Invalid username or password'}), 401
        
        session['user_id'] = user.id
        access_token = create_access_token(identity=user.id)
        
        response = make_response(jsonify({'access_token': access_token, 'id':user.id}), 200)
        response.set_cookie('access_token', access_token, httponly=True, secure=True)
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response
api.add_resource(Login, '/login')

class UserProfile(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if user:
            print(user.to_dict())
            return user.to_dict()  # Convert user object to dictionary
        else:
            return {'message': 'User not found'}, 404  # Return a dictionary with an error message and 404 status code


api.add_resource(UserProfile, '/user')


class Logout(Resource):
    @jwt_required()  # Requires a valid access token
    def delete(self):
        current_user = get_jwt_identity()
        
        # Clear the session data
        session.pop('user_id', None)
        
        # Clear the JWT token cookie
        response = make_response(jsonify({'message': f'Logged out user {current_user}'}), 200)
        unset_jwt_cookies(response)
        
        return response
api.add_resource(Logout, '/logout')
class Users(Resource):
    def get(self):
        users=[user.to_dict() for user in User.query.all()]
        return jsonify(users)  
    
    def post(self):
        data=request.get_json()
        username=data.get('username')
        email=data.get('email')
        password=data.get('password')
        location_name=data.get('location')
        
        location=Location.query.filter_by(name=location_name).first()
        if not location:
            return jsonify({'message': 'Location not found'}), 404
        new_user=User(
            username=username,
            email=email,
            password=password,
            location_id=location.id
        )  
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify(new_user.to_dict()),201
api.add_resource(Users, '/users')
class Weathers(Resource):
    def get(self):
        # if not session['user_id']:
        #     return jsonify({'message': '401: Not Authorized'}), 401
        weathers = Weather.query.all()
        if weathers:
           
            return jsonify([weather.to_dict() for weather in weathers])
        else:
            return jsonify({'message': 'No weathers found'})
    def post(self):
        data=request.get_json()
        temperature=data['temperature']
        humidity=data['humidity']
        windspeed=data['windspeed']
        rain_level=data['rain_level']
        activity=data['activity']
        state=data['state']
        
        
        new_weather=Weather(
            temperature=temperature,
            humidity=humidity,
            windspeed=windspeed,
            rain_level=rain_level,
            activity=activity,
            state=state,
           
        )
        db.session.add(new_weather)
        db.session.commit()
        
    def patch(self, id):
    # Find the weather entry to update
        weather_entry = Weather.query.filter(Weather.id == id).first()

        if not weather_entry:
            return jsonify({'message': 'Weather entry not found'}), 404

        data = request.get_json()
        # Update fields if provided
        if 'temperature' in data:
            weather_entry.temperature = data['temperature']
        if 'humidity' in data:
            weather_entry.humidity = data['humidity']
        if 'windspeed' in data:
            weather_entry.windspeed = data['windspeed']
        if 'rain_level' in data:
            weather_entry.rain_level = data['rain_level']
        if 'activity' in data:
            weather_entry.activity = data['activity']

        # Commit the changes
        db.session.commit()

        return jsonify(weather_entry.to_dict()), 200

api.add_resource(Weathers, '/weather')    
class Locations(Resource):
    def get(self):
        locations = Location.query.all()
        if locations:
            return jsonify([location.to_dict() for location in locations])
        else:
            return jsonify({'message': 'No locations found'})
      # Requires a valid access token
    def post(self):
        data = request.get_json()
       # current_user_id = get_jwt_identity()  # Get the current user's ID from JWT token
        name=data['name']
        activity=data['activity']
    
        weather=Weather.query.filter_by(activity=activity).first()
        new_location = Location(
            name=name,
            activity=activity,
            weather_id=weather.id
            # user_id=current_user_id  # Associate the new location with the logged-in user
        )

        db.session.add(new_location) # Add the new location object to the session
        db.session.commit()

        return jsonify(new_location.to_dict()), 201

        
       
api.add_resource(Locations, '/location')
if __name__ == '__main__':
    app.run(port=5555, debug=True)