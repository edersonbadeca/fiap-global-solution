from models.devices import Device
from services.device import DeviceService


class DeviceController:

    @staticmethod
    def create_device(payload):
        device = Device(
            device=payload['device'],
            potency=payload['potency'],
            usage_time=payload['usage_time']
        )
        device_service = DeviceService()
        return device_service.create(device)

    @staticmethod
    def get_all_devices():
        device_service = DeviceService()
        devices = device_service.get_all()
        if not devices:
            return {'message': 'No devices found'}, 404
        return [
            {
                "id": device.id,
                "device": device.device,
                "potency": device.potency,
                "usage_time": device.usage_time,
                "created_at": device.created_at
            }
            for device in devices
        ]
