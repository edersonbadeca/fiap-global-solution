from services.device import DeviceService


class ConsumptionService:
    def __init__(self, device_service: DeviceService):
        self.device_service = device_service
        self.devices = []

    def calculate_consumption(self):
        self.devices = self.device_service.get_all()
        if not self.devices:
            return
        total_consumption = 0
        total_cost = 0
        detailed_consumption = []
        for device in self.devices:
            consumption = (device.potency * device.usage_time) / 1000  # kWh
            cost = consumption * 0.656  #R$0,656/KWH
            total_consumption += consumption
            total_cost += cost
            detailed_consumption.append({
                "device_id": device.id,
                "device": device.device,
                "consumption": f"{consumption} kWh",
                "cost": f"R${cost:.2f}",
                "tip": device.tip
            })

        return detailed_consumption, f"{total_consumption:.2f}", f"R${total_cost:.2f}"
