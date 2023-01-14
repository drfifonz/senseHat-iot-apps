const sampleTimeSec = 0.1;                  ///< sample time in sec  ///< sample time in msec
const maxSamplesNumber = 100;               ///< maximum number of samples
var sampleTimeMsec;
var xdata; ///< x-axis labels array: time stamps
var ydata; ///< y-axis data array: random value
var lastTimeStamp; ///< most recent time stamp 

var chartContext;  ///< chart context i.e. object that "owns" chart
var chart;         ///< Chart.js object

var timer; ///< request timer

const url = 'https://aa54-85-221-155-134.ngrok.io/?temperature=c'; ///< server app with JSON API

function updateValue(){
  var select = document.getElementById("sampling");
  var value = select.options[select.selectedIndex].value;
  var sampleTimeMsec = value;
  select.addEventListener("change", function() {
    sampleTimeMsec = this.value;
  });
  return sampleTimeMsec;
}
console.log(updateValue());


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
  timer = setInterval(ajaxJSON, sampleTimeMsec);
}


function stopTimer(){
  clearInterval(timer);
}


function ajaxJSON() {
  $.ajax(url, {
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