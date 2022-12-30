# import sense_hat
# sense = sense_hat.SenseHat()


class Diode:
    def __init__(self) -> None:
        pass

    def turn_on_diode(self, position: list[int, int], rgb: list[int, int, int]) -> str:
        if self.__is_colors_in_range(rgb) and self.__is_position_in_range(*position):
            return "Diode set.", 200
            # sense.set_pixcel(x,y,rgb)
        return "VALUES OUT OF RANGE", 420

    def __is_colors_in_range(self, rgb: list) -> bool:
        for color in rgb:
            if color > 256 or color < 0:
                return False
        return True

    def __is_position_in_range(self, x: int, y: int):

        if x > 7 or y > 7 or x < 0 or y < 0:
            return False
        return True
