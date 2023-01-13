import os

from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from api import HelloWorld, SensorsController, DiodeController
from infrastructure import ReadJoystick

DEBUG = True

read_joystick = ReadJoystick(debug=DEBUG)

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

api.add_resource(HelloWorld, "/hello")
api.add_resource(SensorsController, "/")
api.add_resource(DiodeController, "/led")


# def flask_app():
#     app.debug = DEBUG
#     app.run(host="0.0.0.0", port=os.environ.get("PORT", 5000))


if __name__ == "__main__":

    app.debug = DEBUG
    app.run(host="0.0.0.0", port=os.environ.get("PORT", 5000))
