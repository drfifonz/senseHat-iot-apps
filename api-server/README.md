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
| - |-|`"position" : array<number,number>` </br> `"rgb" : array<number,number,number>`|`/`| POST |  Turns on diod at specified position [x,y] in range 0-7 </br> with rgb color (3x range of 0-255). 

