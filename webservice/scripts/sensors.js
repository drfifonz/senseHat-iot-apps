const sampleTimeSec = 0.1;                  ///< sample time in sec
const sampleTimeMsec = 1000*sampleTimeSec;
const url = "http://cab6-85-221-155-134.ngrok.io/hello";
var timer;

var temperature;
	
var humidity;
var pressure;
var orientantion;

function updateTemperature(response){
	var temp = document.getElementById("temperature").value;
	temp = response["temperature"] 
	
}

function getLandingPage(){
  parent.location = "index.html";
}
function stopTimer(){
  clearInterval(timer);
}


function startTimer(){
  timer = setInterval(getRequest(),sampleTimeMsec);
}
function getRequest() {
	const url = "http://cab6-85-221-155-134.ngrok.io/hello";
	fetch("http://localhost:5000/hello",{
    method:'GET',
		mode:'no-cors',
		headers: {
      'Content-Type': 'application/json'
    },
  })
	.then((response) => {
		console.log(response.status)
		if (response.status === 200){
			console.log(response);
			return response;
    }
		else 
			return Promise.reject(response);
		
	})
	.then((responseJSON) => {
		// document.getElementById("response").value = JSON.stringify(responseJSON);
		// document.getElementById("json").value = responseJSON.data;
		
	})
	.catch((error) => {
		var errMsg = '<font color="red">Error: ';
		if(error.status != null)
			errMsg += error.statusText + ' (' + error.status + ')</font>';
		else
			errMsg += error.message + '</font>';
	});
}


function example(){
var params = new URLSearchParams();
params.append("key1", "value1");
params.append("key2", "value2");

var url = "http://example.com/api/endpoint?" + params.toString();

console.log(url)
}
