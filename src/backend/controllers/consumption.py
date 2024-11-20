from services.consumption import ConsumptionService
from services.device import DeviceService


class ConsumptionController:

    @staticmethod
    def calculate_consumption():
        device_service = DeviceService()
        consumption_service = ConsumptionService(device_service)
        result = consumption_service.calculate_consumption()
        if result is None:
            return None, None, None
        return result