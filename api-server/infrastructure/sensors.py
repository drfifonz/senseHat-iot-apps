# from sense_hat import SenseHat
from sense_emu import SenseHat

import re


class Sensors:
    def __init__(self) -> None:
        # self.sense = sensehat
        self.sense = SenseHat()

        # for temporary solution
        try:
            self.temp_value = self.sense.temp
            self.press_value = self.sense.pressure
            self.hum_value = self.sense.humidity
            self.roll, self.pitch, self.yaw = self.sense.get_orientation().values()
            print(
                type(self.roll),
                self.roll,
            )
        except OSError as e:
            print(f"[INFO] CANT USE EMULATOR PARAMS with error: {e}")
            self.temp_value = 30
            self.press_value = 1022
            self.hum_value = 50

            self.roll = 100
            self.pitch = 21
            self.yaw = 3

    def get_temperature(self, parameter: str) -> float:
        try:
            if parameter.lower() == "c":
                return self.temp_value
                # return self.sense.temp
            elif parameter.lower() == "f":
                return self.temp_value * 1.8 + 32
                # return self.sense.temp * 1.8 + 32
        except AttributeError:
            return None

    def get_pressure(self, parameter: str) -> float:
        try:
            if parameter.lower() == "hpa":
                return self.press_value
                # return self.sense.pressure
            elif parameter.lower() == "mmhg":
                return self.press_value * 1.33
                # return sense.pressure * 1.33
        except AttributeError:
            return None

    def get_humidity(self, parameter: str) -> float:
        try:
            if parameter.lower() == "%":
                return self.hum_value
                # return self.sense.humidity
            elif re.search("^[0-1]$|[0].*[0-9]", str(parameter)):
                return self.hum_value / 100
                # return sense.humidity
        except AttributeError:
            return None

    def get_orientation(self, parameter: str) -> list:
        try:
            # orientation = sense.get_orientation()
            orientation = [self.roll, self.pitch, self.yaw]

            if parameter.lower() == "r":
                return orientation
            elif parameter.lower() == "d":
                return list(map(lambda val: round(val * 180 / 3.14 % 360, 2), orientation))
        except AttributeError:
            return None
