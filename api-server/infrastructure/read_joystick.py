import json
import time
from sense_emu import SenseHat

sense = SenseHat()


class ReadJoystick:
    def __init__(self, debug: bool = False) -> None:
        self.debug = debug

        self.file_path = "infrastructure/joystick.json"
        self.clamp_range = 5

    def periodicaly_write_data(self, period: int = 200):
        """
        period in [ms]
        """
        if self.debug:
            print(f"Begin reading joystick with period: {period} [ms]")
        while True:

            event = sense.stick.wait_for_event()

            if event.action == "pressed":
                click = 1 if event.action == "pressed" and event.direction == "middle" else 0
                x = 1 if event.direction == "right" else -1 if event.direction == "left" else 0
                y = 1 if event.direction == "up" else -1 if event.direction == "down" else 0
            else:
                click, x, y = 0, 0, 0

            time.sleep(period / 1000)

            self.__write_data(click, x, y)
            if self.debug:
                print("Loop done", event.direction, event.action)

    def __write_data(self, click, x, y):
        with open(self.file_path, "r+") as file:
            json_data = json.load(file)
            file.seek(0)
            clicks = json_data["clicks"] + click
            x_pos = self.__clamp(json_data["x"] + x)
            y_pos = self.__clamp(json_data["y"] + y)

            data = {"clicks": clicks, "x": x_pos, "y": y_pos}
            file.write(json.dumps(data, indent=4))

    def __clamp(self, value):
        min_value = -self.clamp_range
        max_value = self.clamp_range
        return min(max_value, max(min_value, value))


if __name__ == "__main__":

    read_joystick = ReadJoystick(debug=True)
    read_joystick.periodicaly_write_data(period=500)
