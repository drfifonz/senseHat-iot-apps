from flask import Flask
from flask_restful import Api

from api.controller import SenseHatParameters
import os


app = Flask(__name__)
api = Api(app)


api.add_resource(SenseHatParameters, "/")

if __name__ == "__main__":
    app.run(host="localhost", port=os.environ.get("PORT", 5000))