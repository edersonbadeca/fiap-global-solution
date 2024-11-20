import json
from http import HTTPStatus
from http.client import HTTPResponse

from flask import request, jsonify, Flask

from controllers.consumption import ConsumptionController
from controllers.device import DeviceController
from config.app_config import app, db

with app.app_context():
    db.create_all()
@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'

@app.route('/device', methods=['POST'])
def create_device():
    device_controller = DeviceController()
    payload = request.json
    response =  device_controller.create_device(payload)
    if response:
        return jsonify(HTTPStatus.CREATED)

@app.route('/device', methods=['GET'])
def get_all_devices():
    device_controller = DeviceController()
    message = device_controller.get_all_devices()
    if message is None:
        return HTTPStatus.NOT_FOUND
    return jsonify(message).json

@app.route('/consumption', methods=['GET'])
def calculate_consumption():
    consumption_controller = ConsumptionController()
    detailed_consumption, total_consumption, total_cost  = consumption_controller.calculate_consumption()
    if detailed_consumption is None:
        return jsonify(HTTPStatus.NOT_FOUND)
    return jsonify(detailed_consumption, total_consumption, total_cost).json

if __name__ == '__main__':
    app.run(debug=True, port=8080)

