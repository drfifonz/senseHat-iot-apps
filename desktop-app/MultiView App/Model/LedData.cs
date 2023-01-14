using System.Collections.Generic;

namespace MultiViewApp.Model
{
    public class LedData
    {
        public double Humidity { get; set; }
        public int JoystickClicks { get; set; }
        public List<int> JoystickPosition { get; set; }
        public List<double> Orientation { get; set; }
        public double Pressure { get; set; }
        public double Temperature { get; set; }
    }
}