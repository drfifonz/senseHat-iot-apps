REST API server
====


## Start local REST API server by executing following commands:
Change directory to [api-server](/api-server) directory and run the server :
```bash
cd api-server;
python -m server
```
---
### Default address is set to `http://localhost:5000`

For joystick data reading  its essential* to execute in separate terminal [read_joystick.py](/api-server/infrastructure/read_joystick.py) file.
```bash
cd api-server/infrastructure;
python read_joystick.py
```
##### \* It is caused by cyclic saving joystick status to json file.

---
Requests
---
RESTful service use JSON  data format, add `Content-Type: application/json` to header.

| KEY        | VALUE  | BODY | URL  | Method | Description | 
| :---------:| :-----:| :----| :---:| :-----:|:-----------|
| -     | -  | - |`/hello`| GET| Returns hello world (for test purpouse)|
|temperature</br>humidity</br>pressure</br>orientation</br>joystick | c\|f</br> % </br> num in range of <0-1></br>r\|d</br></br>|- |`/`| GET |Returns parameters like:</br>*temperature* (celcius or farenheit)</br>*humidity* (% or in range of 0-1)</br>*pressure* (hPa or mmHg)</br>*orientation* (degrees or radians)</br>*joystick* [x,y] position in range of <-5,5>  and clicks |
| - |-|-|/| DELETE| Reset joystick status to [0,0] position and 0 clicks | 
| - |-|-|/led| GET| Return json with `"diodes"` objects containing 64 arrays with current RGB status | 
| - |-|**see below**|/led| POST | Control diodes | 
| - |-|-|/led| DELETE| Reset LED panel | 

##### \* acceptable values
Example GET reqest to `/`:
```
localhost:5000/?temperature=c&humidity=%&pressure=hpa&orientation=r&joystick
```

Response:
```json
{
    "humidity": 25.36328125,
    "joystick-clicks": 1,
    "joystick-position": [
        1,
        3
    ],
    "orientation": [
        345.00078611735887,
        0.0,
        0.0
    ],
    "pressure": 1138.5234375,
    "temperature": 45.671875
}
```




Seting LED request body
--

Diodes control is handled by *POST* method sended to `/led` url.</br>
General body structure:
```json
{
    "requests":[
        {
            "position": array:<number,number>
            "rgb": array:<number,number,number>
        },
        ... # there can be more objects with the above structure
    ]
}
```


Example:
```json
{
    "requests": [
            {
                "position" : [1,5],
                "rgb": [12,12,5]
            },
            {
                "position" : [12,1],
                "rgb": [212,22,55]
            },
            {
                "position" : [7,7],
                "rgb": [42,62,55]
            },
            {
                "position" : [21,1],
                "rgb": [212,22,55]
            }
    ]
}
```
Response: 
```
Diode [1, 5] set to [12, 12, 5].
VALUES OUT OF RANGE
Diode [7, 7] set to [42, 62, 55].
VALUES OUT OF RANGE
```
