const sampleTimeSec = 0.1;                  ///< sample time in sec
const sampleTimeMsec = 1000*sampleTimeSec;
const url = "http://localhost:5000/hello";
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
	fetch(url,{
    method:'GET',
    headers:{"Content-Type":"application/json"}
  })
	.then((response) => { 
		console.log(response)
		if (response.ok){
      console.log(response.json()); 
			return response.json();
    }
		else 
			return Promise.reject(response);
		
	})
	.then((responseJSON) => {
		console.log(responseJSON.data);
		// document.getElementById("response").value = JSON.stringify(responseJSON);
		// document.getElementById("json").value = responseJSON.data;
		
	})
	.catch((error) => {
		console.log(error)
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
