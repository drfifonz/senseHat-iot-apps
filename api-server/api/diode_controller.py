import json
from flask import make_response
from flask_restful import Resource, reqparse
from infrastructure import Diode


class DiodeController(Resource):
    diode = Diode()

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("requests", action="append", location="json")
        args = parser.parse_args()

        try:
            message = ""
            for req in args.requests:
                request = json.loads(req.replace("'", '"'))

                position = request["position"]
                rgb = request["rgb"]

                single_message, code = self.diode.turn_on_diode(position, rgb)
                message += single_message + "\n"

        except TypeError:
            message, code = "Missing parameters.", 400

        response = make_response(message, code)
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response

    def delete(self):

        self.diode.clear_panel()

        response = make_response("LED panel cleared", 200)
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response

    def get(self):
        diodes_list = self.diode.get_panel_status()

        message = {"diodes": diodes_list}
        response = make_response(message, 200)
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response
