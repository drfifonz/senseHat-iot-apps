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
| :---------:| :-----:| :---:| :---:| :-----:|:-----------|
| -     | -  | - |`/hello`| GET| Returns hello world (for test purpouse)|
| || |`/`| GET |

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
