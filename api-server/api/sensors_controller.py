from flask import make_response
from flask_restful import Resource, reqparse

from infrastructure import Joystick, Sensors


class HelloWorld(Resource):
    def get(self):
        return {"hello": "world"}


class SensorsController(Resource):
    sensors = Sensors()
    joystick = Joystick()

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("temperature", type=str, location="args")
        parser.add_argument("humidity", type=str, location="args")
        parser.add_argument("orientation", type=str, location="args")
        parser.add_argument("pressure", type=str, location="args")
        parser.add_argument("joystick", location="args")
        args = parser.parse_args()
        # print(args.joystick, type(args.joystick))
        message = {}
        if args.temperature:
            message["temperature"] = self.sensors.get_temperature(args.temperature)
        if args.humidity:
            message["humidity"] = self.sensors.get_humidity(args.humidity)
        if args.pressure:
            message["pressure"] = self.sensors.get_pressure(args.pressure)
        if args.orientation:
            message["orientation"] = self.sensors.get_orientation(args.orientation)
        if args.joystick is not None:
            message["joystick-position"] = self.joystick.get_position()
            message["joystick-clicks"] = self.joystick.get_clicks()

        code = 200 if all(list(message.values())) else 400

        return make_response(message, code)

    def delete(self):
        parser = reqparse.RequestParser()
        parser.add_argument("joystick", location="args")
        args = parser.parse_args()
        if args.joystick is not None:
            self.joystick.clear_data()
            message = "Joystick cleared"
            code = 200
        else:
            message = "No specified parameter"
            code = 400

        return make_response(message, code)
