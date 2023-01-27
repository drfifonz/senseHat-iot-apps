const sampleTimeSec = 0.1;                  ///< sample time in sec
const sampleTimeMsec = 10000*sampleTimeSec;
var url = "http://2bfe-85-221-155-134.ngrok.io/"; // default value of url
var new_url = localStorage.getItem('url');

var timer;
function checkNewUrl(){
if (new_url){
	url = new_url;
}
}
checkNewUrl();
	
var buttonStart = document.getElementById("startButton");
var buttonStop = document.getElementById("stopButton");

buttonStart.addEventListener("click",function(){
	timer = setInterval(getRequest,sampleTimeMsec);
});

buttonStop.addEventListener("click",function(){
	clearInterval(timer);
});

function getLandingPage(){
  parent.location = "index.html";
}


function getRequest() {

	fetch(url+"?temperature=c&humidity=%&pressure=hPa&orientation=d&joystick").then(response => {
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
		document.getElementById("horizontal").innerHTML = responseJSON["joystickPosition"][0]
		document.getElementById("vertical").innerHTML = responseJSON["joystickPosition"][1]
		document.getElementById("clicked").innerHTML = responseJSON["joystickClicks"]
	})
	.catch((error) => {
		var errMsg = '<font color="red">Error: ';
		if(error.status != null)
			errMsg += error.statusText + ' (' + error.status + ')</font>';
		else
			errMsg += error.message + '</font>';
	});
}
