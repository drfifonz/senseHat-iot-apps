const sampleTimeSec = 0.1;                  ///< sample time in sec
const sampleTimeMsec = 1000*sampleTimeSec;
const url = "https://aa54-85-221-155-134.ngrok.io/?temperature=c&humidity=%&pressure=hPa&orientation=d&joystick";
var timer;

var temperature;
	
var buttonStart = document.getElementById("startButton");
var buttonStop = document.getElementById("stopButton");

buttonStart.addEventListener("click",function(){
	timer = setInterval(getRequest,1000);
});

buttonStop.addEventListener("click",function(){
	clearInterval(timer);
});

function getLandingPage(){
  parent.location = "index.html";
}


function getRequest() {

	fetch(url).then(response => {
		if (response.ok){
			return response.json();
    }
		else 
			return Promise.reject(response);	
		
	})
	.then(responseJSON => {
		console.log(responseJSON["temperature"]);
		document.getElementById("temperature").innerHTML = responseJSON["temperature"].toFixed(2);
		document.getElementById("pressure").innerHTML = responseJSON["pressure"].toFixed(2);
		document.getElementById("humidity").innerHTML = responseJSON["humidity"].toFixed(2);
		document.getElementById("roll").innerHTML = responseJSON["orientation"][0];
		document.getElementById("pitch").innerHTML = responseJSON["orientation"][1];
		document.getElementById("yaw").innerHTML = responseJSON["orientation"][2];
		document.getElementById("horizontal").innerHTML = responseJSON["joystick-position"][0]
		document.getElementById("vertical").innerHTML = responseJSON["joystick-position"][1]
		document.getElementById("clicked").innerHTML = responseJSON["joystick-clicks"]
	})
	.catch((error) => {
		var errMsg = '<font color="red">Error: ';
		if(error.status != null)
			errMsg += error.statusText + ' (' + error.status + ')</font>';
		else
			errMsg += error.message + '</font>';
	});
}
