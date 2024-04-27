from app import app
from models import Weather, Location

from config import db

with app.app_context():
    db.drop_all()
    db.create_all()
    
    weathers=[]
    
    weathers.append(Weather(
        
        temperature=20.0,
        humidity=20.0,
        windspeed=20.0,
        rain_level=20.0,
        location_id=1
    )
    )
    weathers.append(Weather(
        temperature=25.0,
        humidity=30.0,
        windspeed=10.0,
        rain_level=0.0,
        location_id=3
    ))
    for weather in weathers:
        db.session.add(weather)
        db.session.commit()
    
    locations=[]
    locations.append(Location(
        name="Nairobi",
        activity="Swimming"
    ))
    for location in locations:
        db.session.add(location)
        db.session.commit()

