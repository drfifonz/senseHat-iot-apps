
// Declare a global variable to store the value, and initialize it with a default value
function saveInput() {
  // Get the value of the input field
  var inputValueIP = document.getElementById("ipaddress").value;
  var inputValuePORT = document.getElementById("port").value;
  var newIP = document.getElementById("setIP");
  // Save the input value to local storage
  if (inputValuePORT){
    correctIP = inputValueIP+':'+inputValuePORT+'/';
  }
  else if (inputValueIP.endsWith('/')){
    correctIP = inputValueIP;
  }
  else{
    correctIP = inputValueIP+'/';
  }
  newIP.textContent = correctIP;
  localStorage.setItem('url',correctIP);
}
function backMenu(){
  parent.location = "index.html"
}
