const sampleTimeSec = 0.1;                  ///< sample time in sec  ///< sample time in msec
const maxSamplesNumber =100;               ///< maximum number of samples
var xdata; ///< x-axis labels array: time stamps
var ydata; ///< y-axis data array: random value
var lastTimeStamp; ///< most recent time stamp 

var chartContext;  ///< chart context i.e. object that "owns" chart
var chart;         ///< Chart.js object

var timer; ///< request timer

var url = 'https://d1b3-85-221-155-134.ngrok.io/'; // default value of url

var new_url = localStorage.getItem('url');
var select = document.getElementById("sampling");
function checkNewUrl(){
if (new_url){
  url = new_url;
}
}
checkNewUrl();
function updateValue(){

  var value = select.options[select.selectedIndex].value;
  var sampleTimeMsec = value;
  return sampleTimeMsec;

}

select.addEventListener("change", function() {
    var new_sampleTimeMsec = parseInt(updateValue());
    localStorage.setItem('sampling_rate',new_sampleTimeMsec);
    console.log(new_sampleTimeMsec);
  });
function addData(y){
  if(ydata.length > maxSamplesNumber)
  {
    removeOldData();
    lastTimeStamp += sampleTimeSec;
    xdata.push(lastTimeStamp.toFixed(4));
  }
  ydata.push(y);
  chart.update();
}
function goToMenu(){
    parent.location = "index.html"
}

function removeOldData(){
  xdata.splice(0,1);
  ydata.splice(0,1);
}


function startTimer(){
  new_sampleTime = localStorage.getItem('sampling_rate')
  console.log(new_sampleTime)
  timer = setInterval(ajaxJSON, parseInt(new_sampleTime));
}


function stopTimer(){
  clearInterval(timer);
}


function ajaxJSON() {
  $.ajax(url+'?temperature=c', {
    type: 'GET', dataType: 'json',
    success: function(responseJSON, status, xhr) {
      console.log(responseJSON);
      addData(+responseJSON["temperature"]);
    }
  });
}

function chartInit()
{
  // array with consecutive integers: <0, maxSamplesNumber-1>
  xdata = [...Array(maxSamplesNumber).keys()]; 
  // scaling all values ​​times the sample time 
  xdata.forEach(function(p, i) {this[i] = (this[i]*sampleTimeSec).toFixed(4);}, xdata);

  // last value of 'xdata'
  lastTimeStamp = +xdata[xdata.length-1]; 

  // empty array
  ydata = []; 

  // get chart context from 'canvas' element
  chartContext = $("#chart")[0].getContext('2d');

  chart = new Chart(chartContext, {
    // The type of chart: linear plot
    type: 'line',

    // Dataset: 'xdata' as labels, 'ydata' as dataset.data
    data: {
      labels: xdata,
      datasets: [{
        fill: false,
        label: 'Temperature',
        backgroundColor: 'rgb(102, 0, 255)',
        borderColor: 'rgb(102, 0, 255)',
        data: ydata,
        lineTension: 0
      }]
    },

    // Configuration options
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Temperature'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Time [s]'
          }
        }]
      }
    }
  });
  
  ydata = chart.data.datasets[0].data;
  xdata = chart.data.labels;
}

$(document).ready(() => { 
  chartInit();
  $.ajaxSetup({ cache: false }); // Web browser cache control
  $("#start").click(startTimer);
  $("#stop").click(stopTimer);
  $("#samplenumber").text(maxSamplesNumber.toString());
});