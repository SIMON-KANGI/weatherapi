from config import create_app,db
from flask import request,jsonify,make_response
from flask_restful import Api,Resource
from models import Weather,Location,User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity,unset_jwt_cookies

app=create_app()
api=Api(app)
@app.route('/')
def hello_world():
    return '<h1>This is a weather api</h1>'



    
class Login(Resource):
    def get(self):
        return {'access_token'}
    def post(self):
        data = request.get_json()
        if 'username' not in data or 'password' not in data:
            return jsonify({'message': 'Username and password are required'}), 400
        
        username = data['username']
        password = data['password']
        user = User.query.filter(User.username == username).first()
        if not user or not user.check_password(password):
            return jsonify({'message': 'Invalid username or password'}), 401
        
        access_token = create_access_token(identity=username)
        return {'access_token': access_token}, 200

api.add_resource(Login, '/login')


class Logout(Resource):
    @jwt_required()  # Requires a valid access token
    def delete(self):
        current_user = get_jwt_identity()
        
        # Create a response object
        response = make_response({'message': f'Logged out user {current_user}'}, 200)
        
        # Invalidate the JWT token by clearing the cookies
        unset_jwt_cookies(response)
        
        return response
api.add_resource(Logout, '/logout')

class Users(Resource):
    def get(self):
        users=[user.to_dict() for user in User.query.all()]
        return jsonify(users)  
    
    def post(self):
        data=request.get_json()
        new_user=User(
            username=data.get('username'),
            email=data.get('email'),
            password=data.get('password')
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

api.add_resource(Weathers, '/weather')    
class Locations(Resource):
    def get(self):
        locations=[location.to_dict() for location in Location.query.all()]
        return jsonify(locations)
api.add_resource(Locations, '/location')
if __name__ == '__main__':
    app.run(port=5555, debug=True)