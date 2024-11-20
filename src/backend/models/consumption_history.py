import datetime

from config.app_config import db

class ConsumptionHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.now)
    device_id = db.Column(db.Integer, db.ForeignKey('device.id'), nullable=False)
    consumption = db.Column(db.Float, nullable=False)  
    cost = db.Column(db.Float, nullable=False)  