
// Declare a global variable to store the value, and initialize it with a default value
function saveInput() {
  // Get the value of the input field
  var inputValueIP = document.getElementById("ipaddress").value;
  var inputValuePORT = document.getElementById("port").value;
  var newIP = document.getElementById("setIP");
  // Save the input value to local storage
  localStorage.setItem("savedInputIP", inputValueIP);
  localStorage.setItem("savedInputPort", inputValuePORT);
  var savedIP = localStorage.getItem("savedInputIP");
  var savedPort = localStorage.getItem("savedInputPort");
  correctIP = savedIP+':'+savedPort+'/'
  newIP.textContent = correctIP
  return correctIP
}
function backMenu(){
  parent.location = "index.html"
}
