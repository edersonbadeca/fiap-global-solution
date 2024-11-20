from config.app_config import db
from models.devices import Device


class DeviceRepository:
    def __init__(self):
        self.db = db

    def create(self, device):
        self.db.session.add(device)
        self.db.session.commit()
        if device.id:
            return device

    def get_devices(self):
        return Device.query.all()