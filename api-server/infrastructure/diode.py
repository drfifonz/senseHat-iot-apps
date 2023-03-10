# from sense_hat import SenseHat
from sense_emu import SenseHat

sense = SenseHat()


class Diode:
    def turn_on_diode(self, position: list, rgb: list) -> str:
        """
        Turn on diode on specific position with rgb values
        """
        if self.__is_colors_in_range(rgb) and self.__is_position_in_range(*position):
            x, y = position
            sense.set_pixel(x, y, rgb)
            return f"Diode {position} set to {rgb}.", 200
        return "VALUES OUT OF RANGE", 420

    def __is_colors_in_range(self, rgb: list) -> bool:
        for color in rgb:
            if color > 255 or color < 0:
                return False
        return True

    def __is_position_in_range(self, x: int, y: int):

        if x > 7 or y > 7 or x < 0 or y < 0:
            return False
        return True

    def clear_panel(self) -> None:
        """
        Sets the entire LED matrix to off
        """
        sense.clear()

    def get_panel_status(self) -> list:
        """
        get all leds status
        """
        return sense.get_pixels()
