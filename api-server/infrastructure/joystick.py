class Joystick:
    def __init__(self, sensehat) -> None:
        self.sence = sensehat

        self.click_counter = 12
        self.x_pos = 11
        self.y_pos = 4
