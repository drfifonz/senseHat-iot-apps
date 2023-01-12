class Joystick:
    def __init__(self, sensehat) -> None:
        self.sence = sensehat

        self.click_counter = 12
        self.x_pos = 11
        self.y_pos = 4

    def get_position(self, args) -> list:
        x, y = self.x_pos, self.y_pos

        return [x, y]

    def get_clicks(self) -> int:
        clicks = self.click_counter
        return clicks
