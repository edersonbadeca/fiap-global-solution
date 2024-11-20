import datetime

from config.app_config import db
from config.app_config import app

class Device(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    device = db.Column(db.String(100), nullable=False)
    potency = db.Column(db.Float, nullable=False)  
    usage_time = db.Column(db.Float, nullable=False)  
    created_at = db.Column(db.DateTime, default=datetime.datetime.now)
    tip = db.Column(db.String(250), nullable=False)

def create_tables():
    db.create_all()