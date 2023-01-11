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

---
Requests
---
RESTful service use JSON  data format, add `Content-Type: application/json` to header.

| KEY        | VALUE  | BODY | URL  | Method | Description | 
| :---------:| :-----:| :----| :---:| :-----:|:-----------|
| -     | -  | - |`/hello`| GET| Returns hello world (for test purpouse)|
|- | - |`"temperature": string [c \| f]*`</br>`"humidity":string [% \| number in range(0-1)]`</br>`"pressure": string [hpa \| mmHg]",`</br>`"orientation":string [d \| r],`</br>`"joystick"` |`/`| GET |Returns parameters like:</br>*temperature* (celcius or farenheit)</br>*humidity* (% or in range of 0-1)</br>*pressure* (hPa or mmHg)</br>*orientation* (degrees or radians)</br>*joystick* |
| - |-|**see below**|/| POST | Control diodes | 

##### \* acceptable values


### Example


<div style="float: left; width: 50%;">
  <p>Request body:</p>
    <p>

```json
{
    "temperature":"c",
    "humidity":"%",
    "pressure": "hpa",
    "orientation":"d"
}
```
</p>
</div>
<div tyle="float: right; width: 50%;">
    <p>Response:</p>
    <p>

```json
{
    "humidity": 50,
    "orientation": [
        332.48,
        123.82,
        171.97
    ],
    "pressure": 1022,
    "temperature": 30
}
```
</p>
</div>



Diodes control
--

Diodes control is handled by *POST* method sended to `/` url.</br>
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
