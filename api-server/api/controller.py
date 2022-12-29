import json

from flask import Flask, request
from flask.views import View
from flask_restful import Resource


class SenseHatParameters(Resource):
    def get(self):
        return {"hello": "world"}
