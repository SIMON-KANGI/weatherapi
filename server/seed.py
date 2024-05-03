from app import app
from models import Weather, Location

from config import db

with app.app_context():
    db.drop_all()
    db.create_all()
    
    # weathers=[]
    
    # weathers.append(Weather(
        
    #     temperature=20.0,
    #     humidity=20.0,
    #     windspeed=20.0,
    #     rain_level=20.0,
    #     state='Calm',
    #     activity='Agriculture',
        
    # )
    # )
    # weathers.append(Weather(
    #     temperature=25.0,
    #     humidity=30.0,
    #     windspeed=10.0,
    #     rain_level=0.0,
    #     state='Sunny',
    #     activity='Swimming'
    
    # ))
    # weathers.append(Weather(
    #     temperature=10.0,
    #     humidity=20.0,
    #     windspeed=50.0,
    #     rain_level=10.0,
    #     state='Cold',
    #     activity='Harvesting'
    
    # ))
    # weathers.append(Weather(
    #     temperature=2.0,
    #     humidity=15.0,
    #     windspeed=10.0,
    #     rain_level=0.0,
    #     state='Very Cold',
    #     activity='Ice Skating'
    
    # ))
    # for weather in weathers:
    #     db.session.add(weather)
    #     db.session.commit()
    
    # locations=[]
    # locations.append(Location(
    #     name="Nairobi",
    #     activity="Swimming"
    # ))
    # locations.append(Location(
    #     name="Mombasa",
    #     activity="Transport"
    # ))
    # locations.append(Location(
    #     name="Kisumu",
    #     activity="Fishing"
    # ))
    # for location in locations:
    #     db.session.add(location)
    #     db.session.commit()

