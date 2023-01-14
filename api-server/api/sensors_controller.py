from flask import make_response
from flask_restful import Resource, reqparse

from infrastructure import Joystick, Sensors


class HelloWorld(Resource):
    def get(self):
        return {"hello": "world"}


class SensorsController(Resource):
    def get(self):
        sensors = Sensors()
        joystick = Joystick()

        parser = reqparse.RequestParser()
        parser.add_argument("temperature", type=str, location="args")
        parser.add_argument("humidity", type=str, location="args")
        parser.add_argument("orientation", type=str, location="args")
        parser.add_argument("pressure", type=str, location="args")
        parser.add_argument("joystick", location="args")
        args = parser.parse_args()

        message = {}
        if args.temperature:
            message["temperature"] = sensors.get_temperature(args.temperature)
        if args.humidity:
            message["humidity"] = sensors.get_humidity(args.humidity)
        if args.pressure:
            message["pressure"] = sensors.get_pressure(args.pressure)
        if args.orientation:
            message["orientation"] = sensors.get_orientation(args.orientation)
        if args.joystick is not None:
            message["joystick-position"] = joystick.get_position()
            message["joystick-clicks"] = joystick.get_clicks()

        code = 200 if all(list(message.values())) else 400

        response = make_response(message, code)
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response

    def delete(self):
        joystick = Joystick()
        parser = reqparse.RequestParser()
        parser.add_argument("joystick", location="args")
        args = parser.parse_args()
        if args.joystick is not None:
            joystick.clear_data()
            message = "Joystick cleared"
            code = 200
        else:
            message = "No specified parameter"
            code = 400

        response = make_response(message, code)
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response
