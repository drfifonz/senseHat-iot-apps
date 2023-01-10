import json
from flask import make_response
from flask_restful import Resource, reqparse

from infrastructure import Diode, Joystick, Sensors


class HelloWorld(Resource):
    def get(self):
        return {"hello": "world"}


class SenseHatParameters(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("temperature", type=str, location="args")
        parser.add_argument("humidity", type=str, location="args")
        parser.add_argument("orientation", type=str, location="args")
        parser.add_argument("pressure", type=str, location="args")
        parser.add_argument("joystick", location="args")
        args = parser.parse_args()

        sensors = Sensors("")
        joystick = Joystick("")

        message = {}
        if args.temperature:
            message["temperature"] = sensors.get_temperature(args.temperature)
        if args.humidity:
            message["humidity"] = sensors.get_humidity(args.humidity)
        if args.pressure:
            message["pressure"] = sensors.get_pressure(args.pressure)
        if args.orientation:
            message["orientation"] = sensors.get_orientation(args.orientation)

        code = 200 if all(list(message.values())) else 400

        return make_response(message, code)

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("requests", action="append", location="json")
        args = parser.parse_args()

        diode = Diode()

        try:
            message = ""
            for req in args.requests:
                request = json.loads(req.replace("'", '"'))

                position = request["position"]
                rgb = request["rgb"]

                single_message, code = diode.turn_on_diode(position, rgb)
                message += single_message + "\n"

        except TypeError:
            message, code = "Missing parameters.", 400

        return make_response(message, code)
