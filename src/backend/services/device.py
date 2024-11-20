from models.devices import Device
from repositories.device import DeviceRepository


class DeviceService:

    @staticmethod
    def create(device: Device) -> Device:
        repository = DeviceRepository()
        return repository.create(device)

    def get_all(self):
        repository = DeviceRepository()
        return repository.get_devices()