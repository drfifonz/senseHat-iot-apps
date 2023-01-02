import json
from flask import make_response
from flask_restful import Resource, reqparse,

from infrastructure import Diode


class HelloWorld(Resource):
    def get(self):
        print("HU")
        return {"hello": "world"}


class SenseHatParameters(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("temperature", type=str)
        parser.add_argument("humidity", type=str)
        parser.add_argument("position", type=str)
        parser.add_argument("pressure", type=str)
        args = parser.parse_args()
        print(args)

        response = {
            "temperature": 123,
            "humidity": 70,
            "position": [1, 2, 3],
            "pressure": 1001,
        }
        return response

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
