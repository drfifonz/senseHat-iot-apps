using Newtonsoft.Json.Linq;
using System;
using System.Globalization;
using System.IO;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Markup;

namespace MultiViewApp.Model
{
    public class ServerIoTmock
    {
        Random rand = new Random();

        public JArray getMeasurements()
        {
            //static async Task Main(string[] args)
            //{
            //    using (var client = new HttpClient())
            //    {
            //        var baseUrl = "https://aa54-85-221-155-134.ngrok.io";
            //        var endpoint = "/?temperature=c&humidity=%&pressure=hpa";
            //        var response = await client.GetAsync(baseUrl + endpoint);
            //        if (response.IsSuccessStatusCode)
            //        {
            //            var responseContent = await response.Content.ReadAsStringAsync();
            //            var sensorData = await JsonSerializer.DeserializeAsync<SensorData>(responseContent);
            //            Console.WriteLine(responseContent);
            //        }
            //        else
            //        {
            //            Console.WriteLine($"Error: {response.StatusCode} - {response.ReasonPhrase}");
            //        }
            //    }
            //}



            string jsonText = "[";

            jsonText += "{\"Name\":\"Temperature\",\"Data\":" + (23.0 + rand.NextDouble()).ToString(CultureInfo.InvariantCulture) + ",\"Unit\":\"C\"},";
            jsonText += "{\"Name\":\"Pressure\",\"Data\":" + (1023.0 + rand.NextDouble()).ToString(CultureInfo.InvariantCulture) + ",\"Unit\":\"hPa\"},";
            jsonText += "{\"Name\":\"Humidity\",\"Data\":" + (43.0 + rand.NextDouble()).ToString(CultureInfo.InvariantCulture) + ",\"Unit\":\"%\"},";

            jsonText += "{\"Name\":\"Roll\",\"Data\":" + (180.0 + rand.NextDouble()).ToString(CultureInfo.InvariantCulture) + ",\"Unit\":\"Deg\"},";
            jsonText += "{\"Name\":\"Pitch\",\"Data\":" + (0.0 + rand.NextDouble()).ToString(CultureInfo.InvariantCulture) + ",\"Unit\":\"Deg\"},";
            jsonText += "{\"Name\":\"Yaw\",\"Data\":" + (270.0 + rand.NextDouble()).ToString(CultureInfo.InvariantCulture) + ",\"Unit\":\"Deg\"}";

            jsonText += "]";

            return JArray.Parse(jsonText);
        }
    }
}
