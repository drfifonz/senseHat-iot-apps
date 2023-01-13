import json


class Joystick:
    def __init__(self) -> None:
        self.file_path = "infrastructure/joystick.json"

        self.click_counter = 12
        self.x_pos = 11
        self.y_pos = 4

    def get_position(self) -> list:
        try:
            with open(self.file_path, "r") as file:

                data = json.load(file)
                x, y = data["x"], data["y"]
        except FileNotFoundError as e:
            print(e)
            x, y = None, None
        return [x, y]

    def get_clicks(self) -> int:
        try:
            with open(self.file_path, "r") as file:

                data = json.load(file)
                clicks = data["clicks"]
        except FileNotFoundError as e:
            print(e)
            clicks = None
        return clicks

    def clear_data(self) -> None:
        with open(self.file_path, "w") as file:
            data = {"clicks": 0, "x": 0, "y": 0}
            file.write(json.dumps(data, indent=4))


if __name__ == "__main__":

    j = Joystick()
    print(j.get_position())
    print(j.get_clicks())
